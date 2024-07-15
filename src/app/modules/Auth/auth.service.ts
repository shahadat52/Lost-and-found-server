import { prisma } from '../../../app';

const userLogin = async (payload: { password: string; email: string }) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });


  return;
};

export const authServices = {
  userLogin,
};
