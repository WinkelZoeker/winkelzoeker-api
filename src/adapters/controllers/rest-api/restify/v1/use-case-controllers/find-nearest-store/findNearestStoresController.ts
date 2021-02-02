import { Logger, UseCase, UseCaseRequest, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';

import GeoLocation from '../../../../../../../core/geoLocation';

class FindNearestStoresController extends AbstractController {
  constructor(private useCase: UseCase, logger: Logger) {
    super(logger);
  }

  public async execute(event: any): Promise<UseCaseResponse> {

		this.logger.info(`FindNearestStoresController.execute, event = ${JSON.stringify(event, null, 2)}`);

		const useCaseRequest: UseCaseRequest = {
			limit: Number(event.limit) || 5
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
