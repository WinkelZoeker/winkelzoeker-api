
import { binding, given, then, when } from 'cucumber-tsflow';
import superagent from 'superagent';

@binding()
export class StoresSteps {

	private response: any;
	private responsePayload: any;
	private request: any;
	private userType: any;

	private requestPayload: any;
	@when(/the client creates a (GET) request to ([/\w-:.]+)$/)
	public createPost(method: string, path: string) {
		const serverUrl = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.API_PORT}${path}`;
		this.request = superagent(method, serverUrl);
	}

}

// let request;
// let result;
// let error;

// When('the client creates a POST request to /users', function () {
// 	request = superagent('POST', 'localhost:8080/users');
// });

// When('attaches a generic empty payload', function () {
// 	return undefined;
// });

// When('sends the request', function (callback) {
// 	request
// 		.then((response) => {
// 			result = response.res;
// 			callback();
// 		})
// 		.catch((errResponse) => {
// 			error = errResponse.response;
// 			callback();
// 		});
// });
