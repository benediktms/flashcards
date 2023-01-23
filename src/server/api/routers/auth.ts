import { createTRPCRouter, publicProcedure } from '../trpc';
import argon2 from 'argon2';
import { signupSchema } from '../../../validators/auth-schema';

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
