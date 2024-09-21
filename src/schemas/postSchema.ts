import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(2),
  author: z.string().min(2)
});

export type PostInput = z.infer<typeof PostSchema>;