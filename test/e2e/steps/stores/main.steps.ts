import { StatusCodes } from 'http-status-codes';
import { binding, given, then, when } from 'cucumber-tsflow';
import superagent from 'superagent';
import assert from 'assert';

import { Store } from "../../../../src/core";

@binding()
export class StoresSteps {

	private response: any;
	private responsePayload: any;
	private request: any;

	private requestPayload: any;

	@when(/the client creates a (GET) request to ([/\w-:.]+)$/)
	public createPost(method: string, path: string) {
		const serverUrl = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.API_PORT}${path}`;
		this.request = superagent(method, serverUrl);
	}

	@when(/^attaches (.+) and (.+) as coordinates$/)
	public attachCoordinates(latitude: string, longitude: string) {

		if (latitude !== 'empty') {
			this.request.query({ latitude })
		}
		if (longitude !== 'empty') {
			this.request.query({ longitude })
		}
	};


	@when(/^attaches the coordinates of (.+) and (.+) as coordinates from (.+)$/)
	public attachCoordinatesWithCity(latitude: string, longitude: string, city: string) {

		if (latitude !== 'empty') {
			this.request.query({ latitude })
		}
		if (longitude !== 'empty') {
			this.request.query({ longitude })
		}
	};


	@when(/^attaches a limit of (.+) records$/)
	public attachLimit(limit: string) {
		if (limit !== 'empty') {
			this.request.query({ limit })
		}
	};

	@when(/^sends the request$/)
	public sendRequest(callback: () => void) {
		this.request
			.then((response: any) => {
				this.response = response.res;
				callback();
			})
			.catch((error: any) => {
				this.response = error.response;
				callback();
			});
	}

	@then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/)
	public checkHTTPResponse(statusCode: number) {
		assert.notStrictEqual(this.response, undefined);
		assert.strictEqual(this.response.statusCode, Number(statusCode));

		try {
			this.responsePayload = JSON.parse(this.response.text);
		} catch (e) {
			throw new Error('Response not a valid JSON object');
		}
	}


	@then(/^the payload should be equal (.+)$/)
	public checkResponseData(result: string) {
		if(this.response.statusCode === StatusCodes.OK){
			this.responsePayload = JSON.parse(this.response.text);

			const stores: Store[] = this.responsePayload.data || [] as Store[];

			const storesUuids = stores.map(store => { return store.uuid })
				.join(',');
	
			assert.strictEqual(result, storesUuids);
		}	
	}	
}
