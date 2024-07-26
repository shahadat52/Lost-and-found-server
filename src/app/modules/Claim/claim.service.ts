import { Claim, ClamStatus } from "@prisma/client"
import { prisma } from "../../../app"
import { JwtPayload } from "jsonwebtoken";

const createClaimInDB = async (data: Claim, user: JwtPayload) => {
    console.log(user.id);
    const userId = user.id
    const claimData = { ...data, userId }
    console.log(claimData);

    const result = await prisma.claim.create({
        data: claimData
    });
    console.log(result);

    return result
};

const getClaimsFromDB = async () => {
    const result = await prisma.claim.findMany({
        include: {
            foundItem: {
                include: {
                    user: true,
                    category: true
                }
            }

        }
    });
    return result;
};

const updateClaimStatusInDB = async (id: string, status: { status: ClamStatus }) => {
    await prisma.claim.findFirstOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.claim.update({
        where: {
            id
        },
        data: {
            status: status.status
        }
    });
    return result
};



export const claimServices = {
    createClaimInDB,
    getClaimsFromDB,
    updateClaimStatusInDB
}