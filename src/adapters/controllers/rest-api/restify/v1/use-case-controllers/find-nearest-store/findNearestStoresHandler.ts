
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse } from '../../../../../models';
import { SearchStoreController } from './findNearestStoresController';
import ConsoleLogger from '../../../../../../infrastructure/consoleLogger';
import { Logger, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';

class SearchStoreHandler extends ApiHandler {
	constructor(logger: Logger, apiVersion: string) {
		super(new SearchStoreController({}), logger, HttpVerb.GET, apiVersion, 'stores');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {
		const event = {
			latitude: req.query['latitude'],
			longitude: req.query['longitude'],
			maxItems: req.query['maxItems'],
		};

		return this.controller.execute(event, this.logger);
	}
}

export default (logger: Logger, apiVersion: string): ApiHandler => new SearchStoreHandler(logger, apiVersion);
