import { Request, Response, Next } from 'restify';
import { ApiResponse } from 'src/adapters/controllers/models';
import { Logger, UseCaseResponse } from '../../../../../usecases/ports/infrastructure';
import AbstractController from '../../abstractController';

enum HttpVerb {
	POST = "post",
	GET = "get",
	PATCH = "patch",
	PUT = "put",
	DELETE = "delete",
	NONE = ""
}

/**
 * Base class for Restify handlers
*/
abstract class ApiHandler {
	constructor(protected controller: AbstractController,
		public logger: Logger,
		public verb: HttpVerb,
		public version:string,
		private _endpoint: string) {
	}

	public get endpoint() {
		return `/${this.version}/${this._endpoint}`;
	}

	protected abstract execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse>;

	public handler = async (req: Request, res: Response, next: Next): Promise<void> => {


		const result: UseCaseResponse = await this.execute(req, res, next);

		const response: ApiResponse = {
			statusCode: 200,
			data: result
		}

		res.send(200, response);
		next();
	}
}

export { HttpVerb, ApiHandler }
