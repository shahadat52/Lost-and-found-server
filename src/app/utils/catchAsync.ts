import { RequestHandler } from "express"

const catchAsync = (fn: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
};

export default catchAsync