import { z } from 'zod';

export const createFlashcardSchema = z
  .object({
    term: z.string().min(1, { message: 'Please enter a term' }),
    termTranslation: z
      .string()
      .min(1, { message: 'Please enter a translation' }),
    example: z.string().optional(),
    exampleTranslation: z.string().optional(),
    collectionName: z.string().default('Default Collection'),
  })
  .refine(
    ({ example, exampleTranslation }) => {
      if (!example && !exampleTranslation) {
        return true;
      }

      if (example && !exampleTranslation) {
        return false;
      }

      if (example && exampleTranslation) {
        return true;
      }
    },
    {
      message: 'Please enter an example translation',
      path: ['exampleTranslation'],
    },
  );

export type CreateFlashcardSchema = z.infer<typeof createFlashcardSchema>;
