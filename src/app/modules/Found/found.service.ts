import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../app"
import { searchTermApplicableFields } from "./found.constant";

const createFoundItemCategoryInDB = async (data: any) => {
    const result = await prisma.foundItemCategory.create({ data })
    return result
};

const createFoundItemInDB = async (user: JwtPayload, data: any) => {
    await prisma.foundItemCategory.findUniqueOrThrow({
        where: {
            id: data.categoryId
        }
    })

    const result = await prisma.foundItem.create({
        data: {
            userId: user.id,
            categoryId: data.categoryId,
            foundItemName: data.foundItemName,
            description: data.description,
            location: data.location
        },
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            categoryId: true,
            category: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            foundItemName: true,
            description: true,
            location: true,
            createdAt: true,
            updateAt: true
        }
    })
    return result

}
/*
[
                {
                    foundItemName: {
                        contains: query.searchTerm,
                        mode: 'insensitive'
                    }

                }
            ]
**/

const getFoundItemsFromDB = async (query: any, option: any) => {
    const { searchTerm, ...queryObj } = query
    let searchQuery = []

    //searchTerm query
    if (query.searchTerm) {
        searchQuery.push({
            OR:
                searchTermApplicableFields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }))

        })
    };

    // fields filtering
    if (Object.keys(queryObj).length > 0) {
        searchQuery.push({
            AND: Object.keys(queryObj).map((field) => ({
                [field]: {
                    equals: queryObj[field]
                }
            }))
        })
    };
    const whereCondition = searchQuery.length > 0 ? { AND: searchQuery } : {}
    // const orCondition = searchTermApplicableFields.map(field => ({
    //     [field]: {
    //         contains: query.searchTerm,
    //         mode: 'insensitive'
    //     }
    // }));
    type TOptions = {
        sortBy: string; page: string, limit: string, sortOrder: string
    }
    const sortAndPagination = (query: TOptions) => {
        return {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        }
    };
    const options = sortAndPagination(option)
    const result = await prisma.foundItem.findMany({
        where: whereCondition,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy:
            queryObj.sortBy && queryObj.sortOrder ? { [queryObj.sortBy]: queryObj.sortOrder } : { 'createdAt': 'desc' }

    });
    return result
}

export const foundServices = {
    createFoundItemCategoryInDB,
    createFoundItemInDB,
    getFoundItemsFromDB
}