import { Logger, UseCaseRequest, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';

import StoreMongoRepository from '../../../../../../repository/storeMongoRepository';
import FindNearestStoresUseCase from '../../../../../../../usecases/stores/findNearestStoresUseCase';
import GeoLocation from '../../../../../../../core/geoLocation';

class FindNearestStoresController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, logger: Logger): Promise<UseCaseResponse> {

		console.log(`>>>>>>> FindNearestStoresController => STEP 1`);

		const storeRepository: StoreMongoRepository = new StoreMongoRepository();
		const findNearestStoreUC = new FindNearestStoresUseCase(storeRepository);

		const limit = event.limit || 5;
		const useCaseRequest: UseCaseRequest = {
			limit
		};

		if(event.latitude && event.longitude) {
			useCaseRequest.geoLocation = new GeoLocation(event.latitude, event.longitude);
		}

		console.log(`>>>>>>> FindNearestStoresController => STEP 2`);
		const stores = await findNearestStoreUC.execute(useCaseRequest);
		console.log(`>>>>>>> FindNearestStoresController => STEP 3`);

		return {
      generic_code: 200,
      stores: stores,
    } as UseCaseResponse;
  }
}

export { FindNearestStoresController };
