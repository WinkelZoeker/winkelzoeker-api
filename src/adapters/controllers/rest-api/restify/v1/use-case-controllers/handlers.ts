import { ApiHandler } from '../api-handler';
import SearchStoreHandler from './search-store/searchStoreHandler';
import HealthHandler from './health/healthHandler';

const API_VERSION = 'v1'

const handlers: ApiHandler[] = [
	new HealthHandler(API_VERSION),
	new SearchStoreHandler(API_VERSION)
]

export { handlers };
