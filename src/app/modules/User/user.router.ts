import express from 'express';
import { userCollections } from './user.collection';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.createUserValidationSchema),
  userCollections.createUser,
);

router.get(
  '/',
  auth(),
  userCollections.getProfile,
);

router.put(
  '/',
  auth(),
  userCollections.updateProfile,
);

export const userRoutes = router;
