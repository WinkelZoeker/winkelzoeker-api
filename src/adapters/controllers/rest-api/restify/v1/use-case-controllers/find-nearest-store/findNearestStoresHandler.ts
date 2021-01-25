
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse } from '../../../../../models';
import { SearchStoreController } from './findNearestStoresController';
import ConsoleLogger from '../../../../../../infrastructure/consoleLogger';
import { Logger, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import BadRequestException from 'src/adapters/controllers/exceptions/badRequestException';

class SearchStoreHandler extends ApiHandler {
	constructor(logger: Logger, apiVersion: string) {
		super(new SearchStoreController({}), logger, HttpVerb.GET, apiVersion, 'stores');
	}

	public validateRequest(req: Request): void {
		const latitude = req.query['latitude'];
		const longitude = req.query['longitude'];
		const limit = req.query['limit'];

		if(latitude && longitude && (isNaN(latitude) || isNaN(longitude))) {
				throw new BadRequestException('The geographic coordinates are in wrong format');
		}

		if(limit && isNaN(limit)) {
			throw new BadRequestException('The limit parameter is in wrong format');
		}
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {
		const event = {
			latitude: req.query['latitude'],
			longitude: req.query['longitude'],
			limit: req.query['limit'],
		};

		return this.controller.execute(event, this.logger);
	}
}

export default (logger: Logger, apiVersion: string): ApiHandler => new SearchStoreHandler(logger, apiVersion);
