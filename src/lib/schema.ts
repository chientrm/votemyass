import { sql } from 'drizzle-orm';
import { unique } from 'drizzle-orm/sqlite-core';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const polls = sqliteTable('polls', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	userId: text('userId').notNull(),
	country: text('country').notNull(),
	title: text('title').notNull(),
	createdAt: text('createdAt')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const votes = sqliteTable(
	'votes',
	{
		id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		userId: text('userId').notNull(),
		country: text('country').notNull(),
		pollId: integer('pollId').notNull(),
		createdAt: text('createdAt')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		value: text('value').notNull()
	},
	(t) => ({
		unq: unique().on(t.userId, t.pollId)
	})
);
