import { z } from 'zod';

const createUserValidationSchema = z.object({
  password: z.string({ required_error: 'password is required' }),
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }),
  profile: z.object({
    bio: z.string({ required_error: 'Bio is required' }),
    age: z.number({ required_error: 'Age is required' }),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};
