/*
 * Module Dependencies
 */

import * as restify from 'restify';
import * as restifyPlugins from 'restify-plugins';
import ConsoleLogger from '../../../../../adapters/infrastructure/consoleLogger';
import { Logger } from '../../../../../usecases/ports/infrastructure';
import config from './config';
import { registerRoutes } from './routes'


/**
 * Initialize Logger
 */
const logger: Logger = new ConsoleLogger();


/**
 * Initialize Server
 */
logger.info(`INITIALIZING SERVER`);
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
	* Middleware
	*/
logger.info(`INITIALIZING MIDDLEWARE`);
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());



/**
	* Start Server, Connect to DB & Require Routes
	*/
logger.info(`STARTING SERVER ON PORT ${config.port}`);
server.listen(config.port, () => {
	logger.debug(`SERVER => ${JSON.stringify(server, null, 2)}`);

	registerRoutes(server, logger);

	logger.info(`SERVER => ${JSON.stringify(server, null, 2)}`);
});
