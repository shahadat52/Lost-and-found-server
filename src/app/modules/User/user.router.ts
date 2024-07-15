import express from 'express';
import { userCollections } from './user.collection';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.createUserValidationSchema),
  userCollections.createUser,
);

export const userRoutes = router;
