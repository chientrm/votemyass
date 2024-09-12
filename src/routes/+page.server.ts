import { db } from '$lib/db';
import { polls } from '$lib/schema';
import { redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load = async ({ url }) => {
	const top = url.searchParams.has('top');
	const [form, pollResults] = await Promise.all([
		superValidate(zod(formSchema)),
		db.query.polls.findMany({
			columns: { id: true, country: true, title: true, yes: true, votes: true },
			orderBy: top
				? [desc(polls.votes), desc(polls.createdAt)]
				: [desc(polls.createdAt), desc(polls.votes)]
		})
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
