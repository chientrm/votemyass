import { hashIPAddress } from '$lib/utils.server';

export const handle = ({ event, resolve }) => {
	const headers = event.request.headers;
	const ip = headers.get('CF-Connecting-IP') ?? '127.0.0.1';
	const userId = hashIPAddress(ip);
	const country = headers.get('CF-IPCountry') ?? 'EN';
	event.locals.userId = userId;
	event.locals.country = country;
	return resolve(event);
};
