export const load = ({ request }) => {
	const tmp = request.headers.get('cf-connecting-ip');
	return { tmp };
};
