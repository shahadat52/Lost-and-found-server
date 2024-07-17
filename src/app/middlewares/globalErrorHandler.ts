import { NextFunction, Request, Response } from "express";
import { ZodError, number } from "zod";
import { TErrorSource } from "../interface/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { validationError } from "../errors/validationError";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

const globalErrorHandler = (err: Error | PrismaClientKnownRequestError, req: Request, res: Response, next: NextFunction) => {

  let statusCode = 500
  let message = 'Something went wrong'
  let errorSource: TErrorSource[] = [
    {
      path: '',
      message: ''
    }
  ];

  const duplicateError = (error: any) => {
    return {
      message: 'Violate Unique Constraint',
      errorSource: [
        {
          path: `Model: ${error.meta?.modelName}, Field: ${(error?.meta?.target as any).map((field: string) => field)}`,
          message: 'Violate Unique Constraint',
        }
      ]
    }
  };

  const prismaValidationError = (err: any) => {
    return {
      message: 'Field Missing',
      errorSource: [
        {
          path: '',
          message: 'Field Missing',
        }
      ]
    }
  };

  const notFoundError = (err: any) => {
    return {
      message: 'Not found',
      errorSource: [
        {
          path: '',
          message: 'Not Found Error',
        }
      ]
    }
  }

  if (err) {


    if (err instanceof ZodError) {
      const simplifyError = validationError(err)
      message = simplifyError.message,
        statusCode = simplifyError.statusCode,
        errorSource = simplifyError.errorSource
    } else if (err.name === "TokenExpiredError") {
      message = err.message,
        statusCode = 400,
        errorSource = [
          {
            path: err.name,
            message: err.message
          }
        ]
    } else if (err.name === "PrismaClientKnownRequestError") {
      const simplifyError = duplicateError(err)
      message = simplifyError.message || "Violate Unique Constraint",
        statusCode = 400,
        errorSource = simplifyError.errorSource
    } else if (err.name === "PrismaClientValidationError") {
      const simplifyError = prismaValidationError(err)
      message = simplifyError.message || "Violate Unique Constraint",
        statusCode = 400,
        errorSource = simplifyError.errorSource
    } else if (err.name === "NotFoundError") {
      const simplifyError = notFoundError(err)
      message = simplifyError.message || "Not Found Error",
        statusCode = httpStatus.NOT_FOUND,
        errorSource = simplifyError.errorSource
    } else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err.message;
      errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ];
    } else if (err instanceof Error) {
      message = err.message;
      errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ];
    }


    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      errorSource,
      err
      // stack: config.node_env === 'Development' ? err?.stack : null


    })

  } else {
    next()
  }


}

export default globalErrorHandler

/**
 * success
 * message
 * errorSource
 * stack
 */