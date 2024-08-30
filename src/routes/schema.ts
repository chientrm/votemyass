import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(16).max(255)
});

export type FormSchema = typeof formSchema;
