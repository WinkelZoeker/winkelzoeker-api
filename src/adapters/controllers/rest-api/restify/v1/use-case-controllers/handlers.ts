import { ApiHandler } from '../api-handler';
import findNearestStoresHandlerFactory from './find-nearest-store/findNearestStoresHandler';
import { Logger } from 'src/usecases/ports/infrastructure';

const handlers: ((logger: Logger, apiVersion: string) => ApiHandler)[] = [
	findNearestStoresHandlerFactory
]


export { handlers };
