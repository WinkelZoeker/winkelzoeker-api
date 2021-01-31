import "../../../loadEnvVariables";

import { CoreBaseError, ErrorSeverity, ErrorObject } from "../../../../../src/usecases/ports/infrastructure/coreBaseError";

const errorObj:  ErrorObject = {
  code: '1',
  message: 'Error object',
  diagnostics: 'Such a terrible error!',
  severity: ErrorSeverity.FATAL,
  error: new Error('Error')
}

class MockError extends CoreBaseError {
	constructor(errorObj: ErrorObject, data: any = {}) {
		super(errorObj, 'MockError data')
	}
}

describe("CoreBaseError", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Constructor", () => {
		it("Shound get and instance of the object.", async () => {

			const error = new MockError(errorObj, 'Any data');

			expect(error).toBeDefined();
			expect(error.code).toEqual(errorObj.code);
			expect(error.message).toEqual(errorObj.message);
			expect(error.diagnostics).toEqual(errorObj.diagnostics);
			expect(error.severity).toEqual(errorObj.severity);
		});
	});
});
