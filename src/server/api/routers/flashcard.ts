import { createFlashcardSchema } from '@/validators/create-flashcard-schema';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const flashcardRouter = createTRPCRouter({
  createFlashcard: protectedProcedure
    .input(createFlashcardSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        collectionName,
        term,
        termTranslation,
        example,
        exampleTranslation,
      } = input;

      let collection = await ctx.prisma.flashcardCollection.findUnique({
        where: {
          name_userId: {
            name: collectionName,
            userId: ctx.session.user.id,
          },
        },
      });

      if (!collection) {
        collection = await ctx.prisma.flashcardCollection.create({
          data: {
            name: collectionName,
            userId: ctx.session.user.id,
          },
        });
      }

      const flashcard = await ctx.prisma.flashcard.create({
        data: {
          term,
          termTranslation,
          example,
          exampleTranslation,
          userId: ctx.session.user.id,
          flashcardCollectionId: collection.id,
        },
      });

      return flashcard;
    }),
});
