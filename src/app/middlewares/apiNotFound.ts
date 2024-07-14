import { NextFunction, Request, RequestHandler, Response } from 'express';
import StatusCode from 'http-status';
const notFound = (req: Request, res: Response) => {
  res.status(StatusCode.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND',
  });
};

export default notFound;
