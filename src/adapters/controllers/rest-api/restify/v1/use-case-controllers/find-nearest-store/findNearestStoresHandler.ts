
import { Request, Response, Next } from 'restify';
import { ApiHandler, HttpVerb } from '../../api-handler';
import { ApiResponse } from '../../../../../models';
import { FindNearestStoresController } from './findNearestStoresController';
import { Logger, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import BadRequestException from '../../../../../../controllers/exceptions/badRequestException';
import InternalServerException from '../../../../../../controllers/exceptions/internalServerException';
import { Controller } from '../../../../../../controllers/rest-api/abstractController';
import ResponseMapper from '../../../../../interfaces/responseMapper';
import FindNearestStoresResponseMapper from './findNearestStoresResponseMapper';
import FindNearestStoresUseCase from '../../../../../../../usecases/stores/findNearestStoresUseCase';
import StoreMongoRepository from '../../../../../../repository/storeMongoRepository';

/** For clarity concerns, renaming logicalXOR => oneCoordinateElementMissing */
import oneCoordinateElementMissing from '../../../../../../../lib/logicalXOR';

export class FindNearestStoresHandler extends ApiHandler {
	constructor(controller: Controller,
		responseMapper: ResponseMapper,
		logger: Logger,
		apiVersion: string) {
		super(controller, responseMapper, logger, HttpVerb.GET, apiVersion, 'stores');
	}

	public validateRequest(queryParams: any): void {
		const latitude = queryParams.hasOwnProperty('latitude') ? queryParams['latitude'] : undefined;
		const longitude = queryParams.hasOwnProperty('longitude') ? queryParams['longitude'] : undefined;
		const limit = queryParams.hasOwnProperty('limit') ? queryParams['limit'] : undefined;

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

		try {
			const latitude = req.query.hasOwnProperty('latitude') ? req.query['latitude'] : undefined;
			const longitude = req.query.hasOwnProperty('longitude') ? req.query['longitude'] : undefined;
			const limit = req.query.hasOwnProperty('limit') ? req.query['limit'] : undefined;

			const event = {
				latitude,
				longitude,
				limit
			};

			return this.controller.execute(event);
		} catch (error) {
			throw new InternalServerException(error.message);
		}
	}
}


export default (logger: Logger, apiVersion: string): ApiHandler =>{

		const responseMapper: ResponseMapper = new FindNearestStoresResponseMapper();
		const repository = new StoreMongoRepository();
		const useCase = new FindNearestStoresUseCase(repository);
		const controller = new FindNearestStoresController(useCase, logger);
		const findNearestStoresHandler: ApiHandler = new FindNearestStoresHandler(controller, responseMapper, logger, apiVersion);

		return findNearestStoresHandler;
}
