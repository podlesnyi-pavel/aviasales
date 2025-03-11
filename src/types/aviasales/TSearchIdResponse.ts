import { z } from 'zod';

export const searchIdResponseSchema = z.object({
  searchId: z.string(),
});

export type TSearchIdResponse = z.infer<typeof searchIdResponseSchema>;
