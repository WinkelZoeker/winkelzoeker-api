import { Logger, UseCaseResponse } from '../../../usecases/ports/infrastructure';

export default abstract class AbstractController {
  public  abstract execute(event: any, logger: Logger): Promise<UseCaseResponse>;
}
