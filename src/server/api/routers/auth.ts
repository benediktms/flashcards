import { Prisma } from '@prisma/client';
import argon2 from 'argon2';

import { signupSchema } from '../../../validators/auth-schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const passwordHash = await argon2.hash(input.password);

      try {
        const user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            passwordHash,
          },
        });

        return user;
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.meta
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.code === 'P2002') {
            const target = (error.meta.target as string[])[0];

            if (target == 'email') {
              throw new Error('This email is already in use');
            }
          }
        } else {
          throw new Error('Something went wrong');
        }
      }
    }),
});
