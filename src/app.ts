import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/apiNotFound';
import { userRoutes } from './app/modules/User/user.router';
import { authRoutes } from './app/modules/Auth/auth.route';
import { foundRoutes } from './app/modules/Found/found.route';
import { claimRouters as claimRoutes } from './app/modules/Claim/claim.router';

export const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from lost and found');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/found', foundRoutes);
app.use('/claims', claimRoutes)
app.use(globalErrorHandler);
app.use(notFound);

export default app;
