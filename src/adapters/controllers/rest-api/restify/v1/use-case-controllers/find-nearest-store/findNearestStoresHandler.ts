
import { Request, Response, Next } from 'restify';
import { ApiHandler, HttpVerb } from '../../api-handler';
import { ApiResponse } from '../../../../../models';
import { FindNearestStoresController } from './findNearestStoresController';
import ConsoleLogger from '../../../../../../infrastructure/consoleLogger';
import { Logger, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import BadRequestException from '../../../../../../controllers/exceptions/badRequestException';
import InternalServerException from '../../../../../../controllers/exceptions/internalServerException';
import { Controller } from '../../../../../../controllers/rest-api/abstractController';

/** For clarity concerns, renaming logicalXOR => oneCoordinateElementMissing */
import oneCoordinateElementMissing from '../../../../../../../lib/logicalXOR';

export class FindNearestStoresHandler extends ApiHandler {
	constructor(controller: Controller, logger: Logger, apiVersion: string) {
		super(controller, logger, HttpVerb.GET, apiVersion, 'stores');
	}

	public validateRequest(queryParams: any): void {
		const latitude = queryParams.hasOwnProperty('latitude') ? queryParams['latitude'] : undefined;
		const longitude = queryParams.hasOwnProperty('longitude') ? queryParams['longitude'] : undefined;
		const limit = queryParams.hasOwnProperty('limit') ? queryParams['limit'] : undefined;

		console.log(`FindNearestStoresHandler.validateRequest:queryParams => ${JSON.stringify(queryParams, null, 2)}`);

		// TODO: Stack errors if time permits/get an out of the box validator for restify
		if (latitude && isNaN(latitude)) {
			throw new BadRequestException('The geographic latitude is in wrong format');
		}
		if (longitude && isNaN(longitude)) {
			throw new BadRequestException('The geographic longitude is in wrong format');
		}

		if (oneCoordinateElementMissing(latitude, longitude)) {
			throw new BadRequestException('Both geographic coordinates should be provided');
		}

		if (limit && isNaN(limit)) {
			throw new BadRequestException('The limit parameter is in wrong format');
		}
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		console.log(`REQUEST.query => ${JSON.stringify(req.query, null, 2)}`)
		try {
			const latitude = req.query.hasOwnProperty('latitude') ? req.query['latitude'] : undefined;
			const longitude = req.query.hasOwnProperty('longitude') ? req.query['longitude'] : undefined;
			const limit = req.query.hasOwnProperty('limit') ? req.query['limit'] : undefined;

			const event = {
				latitude,
				longitude,
				limit
			};

			return this.controller.execute(event, this.logger);
		} catch (error) {
			throw new InternalServerException(error.message);
		}
	}
}

export default (logger: Logger, apiVersion: string): ApiHandler => new FindNearestStoresHandler(new FindNearestStoresController({}), logger, apiVersion);
