import { Logger, UseCaseResponse } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';

class HealthController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, logger: Logger): Promise<UseCaseResponse> {

		logger.debug(`>>>>>>>> CALLED HealthController.execute <<<<<<<<<<<`);

		return {
      code: 200,
      message: "I am fine",
    } as UseCaseResponse;
  }
}

export { HealthController };
