import { prisma } from '../../../app';
import bcrypt from 'bcrypt'
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import config from '../../config';


const userLogin = async (data: { password: string; email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
    }
  });
  const isPasswordMach = bcrypt.compareSync(data.password, user?.password);
  if (!isPasswordMach) { throw new AppError(httpStatus.UNAUTHORIZED, 'Wrong Password') };

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign(
    payload,
    config.access_token.secret as string,
    { expiresIn: config.access_token.expiredIn }
  );

  return {
    ...payload,
    token: accessToken
  }


  return;
};

export const authServices = {
  userLogin,
};
