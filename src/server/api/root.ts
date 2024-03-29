import { authRouter } from './routers/auth';
import { collectionRouter } from './routers/collection';
import { exampleRouter } from './routers/example';
import { flashcardRouter } from './routers/flashcard';
import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  flashcard: flashcardRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
