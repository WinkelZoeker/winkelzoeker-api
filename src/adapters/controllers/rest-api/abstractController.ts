import { Logger, UseCaseResponse } from '../../../usecases/ports/infrastructure';

export interface Controller {
  execute(event: any, logger: Logger): Promise<UseCaseResponse>;
}
export default abstract class AbstractController implements Controller{
  public  abstract execute(event: any, logger: Logger): Promise<UseCaseResponse>;
}
