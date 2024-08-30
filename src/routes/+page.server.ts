import { db } from '$lib/db';
import { polls } from '$lib/schema';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const [form, pollResults] = await Promise.all([
		superValidate(zod(formSchema)),
		db.select().from(polls).orderBy(desc(polls.createdAt))
	]);
	return { form, pollResults };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { title } = form.data;
		const { userId, country } = event.locals;
		const results = await db
			.insert(polls)
			.values({ userId, country, title })
			.returning({ id: polls.id });
		throw redirect(302, `/poll/${results[0].id}`);
	}
};
