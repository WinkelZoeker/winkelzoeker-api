import { Logger, UseCase, UseCaseRequest, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';

import StoreMongoRepository from '../../../../../../repository/storeMongoRepository';
import FindNearestStoresUseCase from '../../../../../../../usecases/stores/findNearestStoresUseCase';
import GeoLocation from '../../../../../../../core/geoLocation';

class FindNearestStoresController extends AbstractController {
  constructor(private useCase: UseCase) {
    super();
  }

  public async execute(event: any, logger: Logger): Promise<UseCaseResponse> {

		console.log(`FindNearestStoresController.execute, event = ${JSON.stringify(event, null, 2)}`);

		const useCaseRequest: UseCaseRequest = {
			limit: event.limit || 5
		};

		if(event.latitude && event.longitude) {
			useCaseRequest.geoLocation = new GeoLocation(event.latitude, event.longitude);
		}
		const stores = await this.useCase.execute(useCaseRequest);

		return {
      stores,
    } as UseCaseResponse;
  }
}

export { FindNearestStoresController };
