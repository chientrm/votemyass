import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(32).max(255)
});

export type FormSchema = typeof formSchema;
