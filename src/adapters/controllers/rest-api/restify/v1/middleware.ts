/** Lib does not provide type */
const serverHealth = require('server-health');

import { Server } from 'restify';
import { Logger } from '../../../../../usecases/ports/infrastructure';


const registerMiddleware = (server: Server, logger: Logger) => {
	serverHealth.exposeHealthEndpoint(server);
};

export { registerMiddleware };
