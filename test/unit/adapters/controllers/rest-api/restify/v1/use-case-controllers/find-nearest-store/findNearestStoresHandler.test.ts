import "../../../../../../../loadEnvVariables";


import httpMocks from 'node-mocks-http';

import ConsoleLogger from "../../../../../../../../../src/adapters/infrastructure/consoleLogger";
import { FindNearestStoresHandler } from "../../../../../../../../../src/adapters/controllers/rest-api/restify/v1/use-case-controllers/find-nearest-store/findNearestStoresHandler";
import BadRequestException from "../../../../../../../../../src/adapters/controllers/exceptions/badRequestException";
import { Logger, UseCaseResponse } from "../../../../../../../../../src/usecases/ports/infrastructure";
import AbstractController from "../../../../../../../../../src/adapters/controllers/rest-api/abstractController";

const logger = new ConsoleLogger();
const apiVersion = 'v1';
function next(object?: any): void { }

class MockController extends AbstractController {
	public execute(event: any, logger: Logger): Promise<UseCaseResponse> { throw new Error("Method not implemented."); }
}

describe("FindNearestStoresHandler", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("execute", () => {
		it("should NOT throw an exception with correct coordinates and limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: 1.0,
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should NOT throw an exception with correct coordinates in string format and limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				latitude: '1.0',
				longitude: '1.0',
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should NOT throw an exception without any coordinates and limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should throw an exception with only latitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with only longitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				longitude: 1.0,
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with one of the coordinates with wrong format (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: "ABC",
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with limit in wrong format (coordinates correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: 1.0,
				limit: 'X'
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

	});

	describe("execute", () => {
		it("should NOT throw an exception with correct coordinates and limit provided", async () => {
			var response = httpMocks.createResponse();
			var request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					latitude: 1.23456,
					longitude: 6.54321,
					limit: 5
				}
			});

			const ucReturn: UseCaseResponse = {
				generic_code: 200,
				stores: [],
			};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute").mockResolvedValue(ucReturn);
			const spyOnResponseSend = jest.spyOn(response, "send");

			try {
				const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(200, { statusCode: 200, data: ucReturn });
		});

		it("should NOT throw an exception without any coordinates and limit provided", async () => {
			var response = httpMocks.createResponse();
			var request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					limit: 5
				}
			});

			const ucReturn: UseCaseResponse = {
				generic_code: 200,
				stores: [],
			};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute").mockResolvedValue(ucReturn);
			const spyOnResponseSend = jest.spyOn(response, "send");

			try {
				const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(200, { statusCode: 200, data: ucReturn });
		});

		it("should send a 400 error with only latitude provided (limit correctly provided)", async () => {
			var response = httpMocks.createResponse();
			var request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					latitude: 5,
					limit: 5
				}
			});

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute");
			const spyOnResponseSend = jest.spyOn(response, "send");
			const findNearestStoresHandler: FindNearestStoresHandler = new FindNearestStoresHandler(new MockController(), logger, apiVersion);

			try {
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).not.toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(400, "Both geographic coordinates should be provided");
		});


	});

});
