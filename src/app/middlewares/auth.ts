import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { prisma } from "../../app";

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) { throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access") };

        const decode = jwt.verify(token, config.access_token.secret as string) as JwtPayload

        await prisma.user.findUniqueOrThrow({
            where: {
                email: decode.email
            }
        });

        req.user = decode
        next()
    })
};

export default auth