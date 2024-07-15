/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import StatusCode from 'http-status';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCode.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND',
  });
};

export default notFound;
