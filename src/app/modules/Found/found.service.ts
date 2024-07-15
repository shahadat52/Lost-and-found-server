import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../app"
import { FoundItem } from "@prisma/client";

const createFoundItemCategoryInDB = async (data: any) => {
    const result = await prisma.foundItemCategory.create({ data })
    return result
};

const createFoundItemInDB = async (user: JwtPayload, data: FoundItem) => {
    const result = await prisma.foundItem.create({
        data: {
            userId: user.id,
            categoryId: data.categoryId,
            foundItemName: data.foundItemName,
            description: data.description,
            location: data.location
        }
    })
    return result
}

export const foundServices = {
    createFoundItemCategoryInDB,
    createFoundItemInDB
}