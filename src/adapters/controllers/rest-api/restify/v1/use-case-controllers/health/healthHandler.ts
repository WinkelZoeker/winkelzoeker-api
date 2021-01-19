
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';
import { HealthController } from './healthController';

class HealthHandler extends ApiHandler {
	constructor(apiVersion: string) {
		super(new HealthController({}), HttpVerb.GET, apiVersion, 'health');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		console.debug(`>>>>>>>> CALLED HealthHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {});

		return useCaseResponse;
	}
}

export default HealthHandler;
