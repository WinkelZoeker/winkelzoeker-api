import { Session } from 'inspector';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';
import AbstractController from '../../../../abstractController';
import { UseCaseResponse } from '../../../../../models';

class HealthController extends AbstractController {
  constructor(private service: any) {
    super();
  }

  public async execute(event: any, context: any, session: Session, logger: Logger): Promise<UseCaseResponse> {

		logger.debug(`>>>>>>>> CALLED HealthController.execute <<<<<<<<<<<`);

		return {
      code: 200,
      message: "I am fine",
    } as UseCaseResponse;
  }
}

export { HealthController };
