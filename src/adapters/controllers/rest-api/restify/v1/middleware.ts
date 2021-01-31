/* istanbul ignore file */

/** Lib does not provide type */
const serverHealth = require('server-health');

import mongoose from 'mongoose'
import { Server } from 'restify';
import { Logger } from '../../../../../usecases/ports/infrastructure';


const registerMiddleware = (server: Server, logger: Logger) => {
	connectMongo(server, logger);
	serverHealth.exposeHealthEndpoint(server);
};


const connectMongo = (server: Server, logger: Logger) => {

	const connectionUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

	try {
		mongoose.connect(
			connectionUrl,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		)
		.then(() => logger.info('MongoDB connected…'))
		.catch(err => logger.error(err))


		//Get the default connection
		var db = mongoose.connection;

		//Bind connection to error event (to get notification of connection errors)
		db.on('error', console.error.bind(console, 'MongoDB connection error:'));
		} catch (error) {
			console.log(`Exception: ${JSON.stringify(error, null, 2)}`)
			logger.error(error);
	}
};


export { registerMiddleware };
