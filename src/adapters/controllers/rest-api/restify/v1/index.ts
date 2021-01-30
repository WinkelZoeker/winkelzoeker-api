/*
 * Module Dependencies
 */

import * as restify from 'restify';
import * as restifyPlugins from 'restify-plugins';
import WebAppLogger from '../../../../../adapters/infrastructure/webApplogger';
import { Logger } from '../../../../../usecases/ports/infrastructure';
import config from './config';
import corsMiddleware from "restify-cors-middleware";  

import { registerMiddleware } from './middleware'
import { registerRoutes } from './routes'


/**
 * Initialize Logger
 */
const logger: Logger = new WebAppLogger();


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

const cors = corsMiddleware({  
	origins: ["*"],
	allowHeaders: ["Authorization"],
	exposeHeaders: ["Authorization"]
});
server.pre(cors.preflight);  
server.use(cors.actual);  

registerMiddleware(server, logger);

/**
	* Start Server, Connect to DB & Require Routes
	*/
logger.info(`STARTING SERVER`);
server.listen(config.port, () => {
	// logger.debug(`SERVER => ${JSON.stringify(server, null, 2)}`);

	registerRoutes(server, logger);

	logger.info(`SERVER LISTENING ON PORT ${config.port}`);
});
