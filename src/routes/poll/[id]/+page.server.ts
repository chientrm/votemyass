import { db } from '$lib/db';
import { polls, votes } from '$lib/schema';
import { and, eq, sql } from 'drizzle-orm';

export const load = async ({ params, locals }) => {
	const pollId = parseInt(params.id);
	const { userId } = locals;
	const [pollResults, voteResults] = await Promise.all([
		db.select().from(polls).where(eq(polls.id, pollId)),
		db
			.select()
			.from(votes)
			.where(and(eq(votes.pollId, pollId), eq(votes.userId, userId)))
	]);
	return { pollResults, voteResults };
};

export const actions = {
	yes: async ({ params, locals }) => {
		const pollId = parseInt(params.id);
		const { userId, country } = locals;
		await db.insert(votes).values({ pollId, country, userId, value: 'yes' });
		await db
			.update(polls)
			.set({ votes: sql`votes + 1`, yes: sql`yes + 1` })
			.where(eq(polls.id, pollId));
	},
	no: async ({ params, locals }) => {
		const pollId = parseInt(params.id);
		const { userId, country } = locals;
		await db.insert(votes).values({ pollId, country, userId, value: 'no' });
		await db
			.update(polls)
			.set({ votes: sql`votes + 1` })
			.where(eq(polls.id, pollId));
	}
};