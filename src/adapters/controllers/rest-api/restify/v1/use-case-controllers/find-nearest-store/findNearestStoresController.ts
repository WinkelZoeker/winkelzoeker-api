import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';
import { UseCaseResponse } from '../../../../../models';

import StoreRepository from '../../../../../../../usecases/ports/repository/storeRepository';
import StoreMongoRepository from '../../../../../../repository/storeMongoRepository';
import FindNearestStoresUseCase from '../../../../../../../usecases/stores/findNearestStoresUseCase';
import GeoLocation from '../../../../../../../core/geoLocation';

class SearchStoreController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, context: any, session: Session, logger: Logger): Promise<UseCaseResponse> {

		logger.debug(`>>>>>>>> CALLED SearchStoreController.execute <<<<<<<<<<<`);

		const storeRepository: StoreMongoRepository = new StoreMongoRepository();

		const findNearestStoreUC = new FindNearestStoresUseCase(storeRepository);

		// const geoLocation = new GeoLocation(51.4416, 5.4697);
		const geoLocation = new GeoLocation(51.417429, 5.444537);

		const stores = await findNearestStoreUC.execute(geoLocation);

		return {
      generic_code: 200,
      stores: stores,
    } as UseCaseResponse;
  }
}

export { SearchStoreController };
