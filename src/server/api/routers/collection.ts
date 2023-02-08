import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const collectionRouter = createTRPCRouter({
  getCollections: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx }) => {
      const collections = await ctx.prisma.flashcardCollection.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      return collections;
    }),
});
