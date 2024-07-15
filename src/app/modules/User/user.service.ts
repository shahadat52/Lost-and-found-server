/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import bcrypt from 'bcrypt'
import config from '../../config';
const createUserInDB = async (data: any) => {
  const { password, user } = data;
  const result = await prisma.$transaction(async (transactionFN) => {
    const hashPassword = bcrypt.hashSync(password, Number(config.salt_round));
    const createUser = await transactionFN.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });
    const createUserProfile = await transactionFN.userProfile.create({
      data: {
        userId: createUser?.id,
        bio: user.bio,
        age: user.age,
      },
    });
    return createUserProfile;
  });

  return result;
};

export const userServices = {
  createUserInDB,
};
