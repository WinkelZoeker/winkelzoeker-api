/*
 * Module Dependencies
 */

import * as restify from 'restify';
import * as restifyPlugins from 'restify-plugins';
import config from './config';
import { registerRoutes } from './routes'

/**
 * Initialize Server
 */
console.log(`INITIALIZING SERVER`);
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
	* Middleware
	*/
console.log(`INITIALIZING MIDDLEWARE`);
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
	* Start Server, Connect to DB & Require Routes
	*/
console.log(`STARTING SERVER ON PORT ${config.port}`);
server.listen(config.port, () => {
	// console.debug(`SERVER => ${JSON.stringify(server, null, 2)}`);
	registerRoutes(server);
	console.log(`Server is listening on port ${config.port}`);
});
