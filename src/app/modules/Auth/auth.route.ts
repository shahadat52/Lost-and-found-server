import express from 'express';
import { authCollections } from './auth.collection';

const router = express.Router();

router.use('/login', authCollections.login);

export const authRoutes = router;
