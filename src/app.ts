import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/apiNotFound';

export const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from lost and found');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
