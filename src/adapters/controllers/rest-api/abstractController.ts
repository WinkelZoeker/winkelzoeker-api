import { Logger, UseCaseResponse } from '../../../usecases/ports/infrastructure';

export interface Controller {
	logger: Logger
  execute(event: any): Promise<UseCaseResponse>;
}
export default abstract class AbstractController implements Controller {
	constructor(public logger: Logger) { }
	public abstract execute(event: any): Promise<UseCaseResponse>;
}
