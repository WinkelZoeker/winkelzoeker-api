import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';
import { UseCaseResponse } from '../../../../../models';

import StoreRepository from '../../../../../../../usecases/ports/repository/storeRepository';
import StoreMongoRepository from '../../../../../../../adapters/repository/storeMongoRepository';

class SearchStoreController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, context: any, session: Session, logger: Logger): Promise<UseCaseResponse> {

		logger.debug(`>>>>>>>> CALLED SearchStoreController.execute <<<<<<<<<<<`);

		const storeRepository: StoreMongoRepository = new StoreMongoRepository();
		const records = await storeRepository.findAll();
		const total = records.length;
		// const total = 999;

		return {
      generic_code: 200,
      totalRecords: total,
    } as UseCaseResponse;
  }
}

export { SearchStoreController };
