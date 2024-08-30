import { db } from '$lib/db';
import { polls } from '$lib/schema';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load = async () => ({
	form: await superValidate(zod(formSchema))
});

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
