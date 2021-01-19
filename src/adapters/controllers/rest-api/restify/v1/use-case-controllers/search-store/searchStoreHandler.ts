
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';
import { SearchStoreController } from './searchStoreController';
import ConsoleLogger from '../../../../../../infrastructure/consoleLogger';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';

class SearchStoreHandler extends ApiHandler {
	constructor(logger: Logger, apiVersion: string) {
		super(new SearchStoreController({}), logger, HttpVerb.GET, apiVersion, '$search');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		this.logger.debug(`>>>>>>>> CALLED SearchStoreHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {}, this.logger);

		return useCaseResponse;
	}
}

export default (logger: Logger, apiVersion: string): ApiHandler => new SearchStoreHandler(logger, apiVersion);
