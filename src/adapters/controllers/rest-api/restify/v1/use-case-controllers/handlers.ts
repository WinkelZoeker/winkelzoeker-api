import { ApiHandler } from '../api-handler';
import searchStoreHandlerFactory from './search-store/searchStoreHandler';
import healthHandlerFactory from './health/healthHandler';
import { Logger } from 'src/usecases/ports/infrastructure';

const handlers: ((logger: Logger, apiVersion: string) => ApiHandler)[] = [
	searchStoreHandlerFactory,
	// healthHandlerFactory
]


export { handlers };
