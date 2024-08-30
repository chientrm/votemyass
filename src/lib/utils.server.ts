import { SALT } from '$env/static/private';
import * as crypto from 'crypto';

export const hashIPAddress = (ip: string) => {
	const ipWithSalt = ip + SALT;
	const hash = crypto.createHash('sha256');
	hash.update(ipWithSalt);
	return hash.digest('hex');
};
