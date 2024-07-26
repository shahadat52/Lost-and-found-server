import { RequestHandler } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createUserInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Create Successfully',
    data: result,
  });
});

const getProfile: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getProfileFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile Retrieved Successfully',
    data: result,
  });
});

const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.updateProfileInDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile Data Updated Successfully',
    data: result,
  });
});

export const userCollections = {
  createUser,
  getProfile,
  updateProfile
};
