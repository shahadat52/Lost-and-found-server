import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { claimServices } from "./claim.service";

const createClaim = catchAsync(async (req, res) => {
    const result = await claimServices.createClaimInDB(req.body, req.user)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Claim issued successfully',
        data: result
    })
});

const getClaims = catchAsync(async (req, res) => {
    const result = await claimServices.getClaimsFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Claims data retrieved successfully',
        data: result
    })
});

const updateClaimStatus = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await claimServices.updateClaimStatusInDB(id, req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Claim status update successfully',
        data: result
    })
});

export const claimCollections = {
    createClaim,
    getClaims,
    updateClaimStatus
}