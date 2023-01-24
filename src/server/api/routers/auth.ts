import argon2 from 'argon2';

import { signupSchema } from '../../../validators/auth-schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const passwordHash = await argon2.hash(input.password);

      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash,
        },
      });

      return user;
    }),
});
