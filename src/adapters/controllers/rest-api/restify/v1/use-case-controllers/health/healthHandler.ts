
import {Request, Response, Next} from 'restify';
import {ApiHandler, HttpVerb} from '../../api-handler';
import { ApiResponse, UseCaseResponse } from '../../../../../models';
import { HealthController } from './healthController';
import ConsoleLogger from '../../../../../../infrastructure/consoleLogger';
import { Logger } from '../../../../../../../usecases/ports/infrastructure';

class HealthHandler extends ApiHandler {
	constructor(logger: Logger, apiVersion: string) {
		super(new HealthController({}), logger, HttpVerb.GET, apiVersion, 'health');
	}

	protected async execute(req: Request, res: Response, next: Next): Promise<UseCaseResponse> {

		this.logger.debug(`>>>>>>>> CALLED HealthHandler.execute <<<<<<<<<<<`);

		const useCaseResponse: UseCaseResponse = this.controller.execute({}, {}, {}, this.logger);

		return useCaseResponse;
	}
}

export default (logger: Logger, apiVersion: string): ApiHandler => new HealthHandler(logger, apiVersion);
