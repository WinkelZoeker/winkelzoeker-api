/* istanbul ignore file */

import { Server, Request, Response, Next, RouteOptions, RequestHandlerType, Route } from 'restify';

import { handlers } from './use-case-controllers/handlers'
import { ApiHandler, HttpVerb } from './api-handler';
import { Logger } from '../../../../../usecases/ports/infrastructure';

const registerRoute = (server: Server, apiHandler: ApiHandler) => {
	console.log(`MAPPING => ${JSON.stringify(apiHandler.endpoint, null, 2)}`);
	switch (apiHandler.verb) {
		case HttpVerb.GET: server.get(apiHandler.endpoint, apiHandler.handler); break;
		case HttpVerb.PUT: server.put(apiHandler.endpoint, apiHandler.handler); break;
		case HttpVerb.POST: server.post(apiHandler.endpoint, apiHandler.handler); break;
		case HttpVerb.PATCH: server.patch(apiHandler.endpoint, apiHandler.handler); break;
		default: break; //TODO: THROW EXCEPTION
	}
}

const API_VERSION = 'v1';

const registerRoutes = (server: Server, logger: Logger) => {
	handlers.forEach(apiHandlerFactory => {
		registerRoute(server, apiHandlerFactory(logger, API_VERSION));
	});
};

export { registerRoutes };
