import * as errors from 'restify-errors';
import { Server, Request, Response, Next, RouteOptions, RequestHandlerType, Route } from 'restify';

import { handlers } from './use-case-controllers/handlers'
import { ApiHandler, HttpVerb } from './api-handler';
import ConsoleLogger from '../../../../infrastructure/consoleLogger';
import { Logger } from '../../../../../usecases/ports/infrastructure';

// const registers:{
// 	[index:string] : (opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]) => Route | boolean
// } = {
// 	'post': server.post.bind(server),
// 	'get': server.get.bind(server)
// };
// console.debug(`REGISTERS => ${JSON.stringify(registers, null, 2)}`);

const registerRoute = (server: Server, apiHandler: ApiHandler) => {
	//debug(`MAPPING => ${JSON.stringify(apiHandler.endpoint, null, 2)}`);
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
	handlers.forEach(apiHandleraFactory => {
		registerRoute(server, apiHandleraFactory(logger, API_VERSION)
		);
	});
};

export { registerRoutes };
