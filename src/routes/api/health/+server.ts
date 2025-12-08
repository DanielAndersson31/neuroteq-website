import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({
		status: 'healthy',
		timestamp: new Date().toISOString(),
		uptime: process.uptime()
	}), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
