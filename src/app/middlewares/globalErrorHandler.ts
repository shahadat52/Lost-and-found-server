import { NextFunction, Request, Response } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import { STATUS_CODES } from 'http';
import validationError from '../errors/validationError';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err) {
    let statusCode: number = 500;
    let message = 'Something went wrong';
    let errorSource: TErrorSource[] = [
      {
        path: '',
        message: '',
      },
    ];

    const duplicateError = (error: any) => {
      return {
        message: 'Violate Unique Constraint',
        errorSource: [
          {
            path: `Model: ${error?.meta?.modelName}, Field: ${(error?.meta?.target as any).map((field: string) => field)}`,
            message: 'Violate Unique Constraint',
          },
        ],
      };
    };

    const prismaValidationError = () => {
      return {
        message: 'Field Missing',
        errorSource: [
          {
            path: '',
            message: 'Field Missing',
          },
        ],
      };
    };

    const notFoundError = () => {
      return {
        message: 'Not found',
        errorSource: [
          {
            path: '',
            message: 'Not Found Error',
          },
        ],
      };
    };

    if (err) {
      console.log(err);

      if (err instanceof ZodError) {
        const simplifyError = validationError(err);
        (message = simplifyError.message),
          (statusCode = simplifyError.statusCode),
          (errorSource = simplifyError.errorSource);
      } else if (err.name === 'TokenExpiredError') {
        (message = err.message),
          (statusCode = 400),
          (errorSource = [
            {
              path: err.name,
              message: err.message,
            },
          ]);
      } else if (err.name === 'PrismaClientKnownRequestError') {
        const simplifyError = duplicateError(err);
        console.log(simplifyError);
        (message = simplifyError.message || 'Violate Unique Constraint'),
          (statusCode = 400),
          (errorSource = simplifyError.errorSource);
      } else if (err.name === 'PrismaClientValidationError') {
        const simplifyError = prismaValidationError();
        console.log(simplifyError);
        (message = simplifyError.message || 'Violate Unique Constraint'),
          (statusCode = 400),
          (errorSource = simplifyError.errorSource);
      } else if (err.name === 'NotFoundError') {
        const simplifyError = notFoundError();
        console.log(simplifyError);
        (message = simplifyError.message || 'Not Found Error'),
          (statusCode = STATUS_CODES?.NOT_FOUND as any),
          (errorSource = simplifyError.errorSource);
      }

      res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        errorSource,
        err,
        // stack: config.node_env === 'Development' ? err?.stack : null
      });
    } else {
      next();
    }
  }
};

export default globalErrorHandler;
