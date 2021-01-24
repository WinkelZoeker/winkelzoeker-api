import { ApiHandler } from '../api-handler';
import findNearestStoresHandlerFactory from './find-nearest-store/findNearestStoresHandler';
import healthHandlerFactory from './health/healthHandler';
import { Logger } from 'src/usecases/ports/infrastructure';

const handlers: ((logger: Logger, apiVersion: string) => ApiHandler)[] = [
	findNearestStoresHandlerFactory,
	// healthHandlerFactory
]


export { handlers };
