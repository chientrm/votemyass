import { json } from '@sveltejs/kit';

export const GET = ({ request }) => {
	const tmp = request.headers.get('cf-connecting-ip');
	return json({ tmp });
};
