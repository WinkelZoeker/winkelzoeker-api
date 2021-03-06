/* istanbul ignore file */

const config = {
	name: 'GENERIC API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.API_PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
	version: '1'
};

export default config;
