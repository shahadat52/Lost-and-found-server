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
    let statusCode = 500; // Default status code
    let message = 'Something went wrong';
    let errorSource: TErrorSource[] = [
      {
        path: '',
        message: '',
      },
    ];

    console.log(statusCode);

    const duplicateError = (error: any) => ({
      message: 'Violate Unique Constraint',
      errorSource: [
        {
          path: `Model: ${error?.meta?.modelName}, Field: ${(error?.meta?.target as any).map((field: string) => field)}`,
          message: 'Violate Unique Constraint',
        },
      ],
    });

    const prismaValidationError = () => ({
      message: 'Field Missing',
      errorSource: [
        {
          path: '',
          message: 'Field Missing',
        },
      ],
    });

    const notFoundError = () => ({
      message: 'Not found',
      errorSource: [
        {
          path: '',
          message: 'Not Found Error',
        },
      ],
    });

    if (err instanceof ZodError) {
      const simplifyError = validationError(err);
      message = simplifyError.message;
      statusCode = simplifyError.statusCode;
      errorSource = simplifyError.errorSource;
    } else if (err.name === 'TokenExpiredError') {
      message = err.message;
      statusCode = 400;
      errorSource = [
        {
          path: err.name,
          message: err.message
        }
      ]
    } else if (err.name === 'PrismaClientKnownRequestError') {
      const simplifyError = duplicateError(err);
      message = simplifyError.message || 'Violate Unique Constraint';
      statusCode = 400;
      errorSource = simplifyError.errorSource;
    } else if (err.name === 'PrismaClientValidationError') {
      const simplifyError = prismaValidationError();
      message = simplifyError.message || 'Violate Unique Constraint';
      statusCode = 400;
      errorSource = simplifyError.errorSource;
    } else if (err.name === 'NotFoundError') {
      const simplifyError = notFoundError();
      message = simplifyError.message || 'Not Found Error';
      statusCode = 404; // Use 404 directly
      errorSource = simplifyError.errorSource;
    } else {
      // Handle any other types of errors
      message = err.message || message;
      statusCode = statusCode || 500; // Ensure statusCode is set
      errorSource = [
        {
          path: err.name || 'Unknown Error',
          message: err.message || 'An unknown error occurred',
        },
      ];
    }

    console.log({ statusCode });

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
};

export default globalErrorHandler;
