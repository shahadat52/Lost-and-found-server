import { RecordType } from "zod";
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
});

const getFoundItems = catchAsync(async (req, res) => {
    const filterQueryKeys = (obj: any, keys: any) => {
        console.log({ obj });
        return Object.keys(obj)
            .filter(key => keys.includes(key))
            .reduce((filteredObj: Record<string, unknown>, key) => {
                filteredObj[key] = obj[key];
                return filteredObj;
            }, {});
    }
    const field = filterQueryKeys(req.body, ['foundItemName', 'searchTerm'])
    const option = filterQueryKeys(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    console.log({ option });
    const result = await foundServices.getFoundItemsFromDB(field, option);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Found Item Data Retrieve successfully',
        data: result
    })
})

export const foundCollections = {
    createFoundItemCategory,
    createFoundItem,
    getFoundItems
}