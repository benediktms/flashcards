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
        include: { flashcards: true },
      });

      return collections;
    }),
  getSingleCollection: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const collection = await ctx.prisma.flashcardCollection.findUniqueOrThrow(
        {
          where: {
            id: input.collectionId,
          },
          include: { flashcards: true },
        },
      );

      return collection;
    }),
});
