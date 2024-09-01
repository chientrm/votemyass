import { db } from '$lib/db';
import { polls, votes } from '$lib/schema';
import { and, eq, sql } from 'drizzle-orm';

export const load = async ({ params, locals }) => {
	const pollId = parseInt(params.id);
	const [pollResult, voteResults, myVoteResult] = await Promise.all([
		db.query.polls
			.findFirst({
				columns: {
					id: true,
					yes: true,
					votes: true,
					country: true,
					title: true
				},
				where: eq(polls.id, pollId)
			})
			.then((res) => res!),
		db.query.votes.findMany({
			columns: { country: true, value: true },
			where: eq(votes.pollId, pollId)
		}),
		db.query.votes.findFirst({
			columns: { value: true },
			where: and(eq(votes.pollId, pollId), eq(votes.userId, locals.userId))
		})
	]);
	return { pollResult, voteResults, myVoteResult };
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
