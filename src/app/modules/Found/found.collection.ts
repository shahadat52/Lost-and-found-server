import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { foundServices } from "./found.service";

const createFoundItemCategory = catchAsync(async (req, res) => {
    const result = await foundServices.createFoundItemCategoryInDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category created successfully',
        data: result
    })
});

const createFoundItem = catchAsync(async (req, res) => {
    const result = await foundServices.createFoundItemInDB(req.user, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Item created successfully',
        data: result
    })
})

export const foundCollections = {
    createFoundItemCategory,
    createFoundItem
}