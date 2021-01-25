import { StatusCodes } from 'http-status-codes';
import { Request, Response, Next } from 'restify';
import { ApiResponse, Resource } from '../../../../controllers/models';
import { Logger, UseCaseResponse } from '../../../../../usecases/ports/infrastructure';
import AbstractController from '../../abstractController';
import ResponseMapper from '../../../interfaces/responseMapper';

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
	protected abstract execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse>;
	public abstract validateRequest(queryParams: any): void;

	constructor(protected controller: AbstractController,
		private responseMapper: ResponseMapper,
		public logger: Logger,
		public verb: HttpVerb,
		public version: string,
		private _endpoint: string) {
	}

	public get endpoint() {
		return `/${this.version}/${this._endpoint}`;
	}


	public handler = async (req: Request, res: Response, next: Next): Promise<void> => {

		try {
			this.validateRequest(req.query);

			const result: UseCaseResponse = await this.execute(req, res, next);
			const response: ApiResponse = this.responseMapper.mapUseCaseResponseToApiResponse(result);
			res.send(response.statusCode, response);
			next();
		} catch (error) {
			console.log(`ApiHandler.handler: ERROR => ${JSON.stringify(error, null, 2)}`);

			const response: ApiResponse = this.responseMapper.mapErrorToApiResponse(error);

			res.send(response.statusCode, response);
			next();
		}
	}
}

export { HttpVerb, ApiHandler }
