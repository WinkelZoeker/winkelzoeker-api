import { Logger, UseCaseRequest, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';

import StoreMongoRepository from '../../../../../../repository/storeMongoRepository';
import FindNearestStoresUseCase from '../../../../../../../usecases/stores/findNearestStoresUseCase';
import GeoLocation from '../../../../../../../core/geoLocation';

class SearchStoreController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, logger: Logger): Promise<UseCaseResponse> {

		logger.debug(`>>>>>>>> CALLED SearchStoreController.execute, event : ${JSON.stringify(event, null, 2)}`);

		const storeRepository: StoreMongoRepository = new StoreMongoRepository();
		const findNearestStoreUC = new FindNearestStoresUseCase(storeRepository);

		const maxItems = event.maxItems || 5;
		let geoLocation = undefined;

		if(event.latitude && event.longitude) {
			geoLocation = new GeoLocation(event.latitude, event.longitude);
		}

		// const geoLocation = new GeoLocation(51.4416, 5.4697);
		const useCaseRequest: UseCaseRequest = {
			geoLocation,
			maxItems
		};

		const stores = await findNearestStoreUC.execute(useCaseRequest);

		return {
      generic_code: 200,
      stores: stores,
    } as UseCaseResponse;
  }
}

export { SearchStoreController };
