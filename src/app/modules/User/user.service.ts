/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import bcrypt from 'bcrypt'
import config from '../../config';
const createUserInDB = async (data: any) => {
  const { password, email, name, profile } = data;
  const result = await prisma.$transaction(async (transactionFN) => {
    const hashPassword = bcrypt.hashSync(password, Number(config.salt_round));
    const createUser = await transactionFN.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true

      }

    });
    const createUserProfile = await transactionFN.userProfile.create({
      data: {
        userId: createUser?.id,
        bio: profile.bio,
        age: profile.age,
      },
      select: {
        id: true,
        userId: true,
        bio: true,
        age: true,
        createdAt: true,
        updatedAt: true,
      },

    });
    return {
      ...createUser,
      profile: createUserProfile
    };
  });

  return result;
};

export const userServices = {
  createUserInDB,
};
