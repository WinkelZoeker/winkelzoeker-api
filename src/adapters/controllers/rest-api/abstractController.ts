import { Logger, UseCaseResponse } from '../../../usecases/ports/infrastructure';
import { Session } from '../models';

export default abstract class AbstractController {
  public  abstract execute(event: any, context: any, session: Session, logger: Logger): Promise<UseCaseResponse>;
}
