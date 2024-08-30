import { json } from '@sveltejs/kit';

export const GET = ({ request }) => {
	const ip = request.headers.get('cf-connecting-ip');
	return json({ ip });
};
