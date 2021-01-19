
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';
import { SearchStoreController } from './searchStoreController';

class SearchStoreHandler extends ApiHandler {
	constructor(apiVersion: string) {
		super(new SearchStoreController({}), HttpVerb.GET, apiVersion, '$search');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		console.debug(`>>>>>>>> CALLED SearchStoreHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {});

		return useCaseResponse;
	}
}

export default SearchStoreHandler;
