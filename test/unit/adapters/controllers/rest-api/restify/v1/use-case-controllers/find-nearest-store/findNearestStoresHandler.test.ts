import "../../../../../../../loadEnvVariables";

import httpMocks from 'node-mocks-http';
import { StatusCodes } from "http-status-codes";

import ConsoleLogger from "../../../../../../../../../src/adapters/infrastructure/consoleLogger";
import { FindNearestStoresHandler } from "../../../../../../../../../src/adapters/controllers/rest-api/restify/v1/use-case-controllers/find-nearest-store/findNearestStoresHandler";
import BadRequestException from "../../../../../../../../../src/adapters/controllers/exceptions/badRequestException";
import { UseCaseResponse } from "../../../../../../../../../src/usecases/ports/infrastructure";
import AbstractController from "../../../../../../../../../src/adapters/controllers/rest-api/abstractController";
import ResponseMapper from "../../../../../../../../../src/adapters/controllers/interfaces/responseMapper"
import BaseException from "../../../../../../../../../src/adapters/controllers/exceptions/baseException";
import { ApiResponse } from "../../../../../../../../../src/adapters/controllers/models";

const logger = new ConsoleLogger();
const apiVersion = 'v1';
function next(object?: any): void { 
	console.log(`Object => ${JSON.stringify(object, null, 2)}`);
}

class MockController extends AbstractController {
	public execute(_event: any): Promise<UseCaseResponse> {
		throw new Error("Method not implemented.");
	}
}

export default class MockResponseMapper implements ResponseMapper {
	mapUseCaseResponseToApiResponse(_useCaseResponse: UseCaseResponse): ApiResponse {
		throw new Error("Method not implemented.");
	}
	mapErrorToApiResponse(_error: BaseException): ApiResponse {
		throw new Error("Method not implemented.");
	}
}

describe("FindNearestStoresHandler", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("execute", () => {
		it("should NOT throw an exception with correct coordinates and limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: 1.0,
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should NOT throw an exception with correct coordinates in string format and limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: '1.0',
				longitude: '1.0',
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should throw an exception when there are no coordinates nor limit provided", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with only latitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with only longitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				longitude: 1.0,
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with Longitude with wrong format (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: "ABC",
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with Latitude with wrong format (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: "ABC",
				longitude: 1.0,
				limit: 5
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with limit in wrong format (coordinates correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				longitude: 1.0,
				limit: 'X'
			};

			expect(findNearestStoresHandler.endpoint).toEqual("/v1/stores");
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

	});

	describe("execute", () => {
		it("should NOT throw an exception with correct coordinates and limit provided", async () => {
			const response = httpMocks.createResponse();
			const request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					latitude: 1.23456,
					longitude: 6.54321,
					limit: 5
				}
			});

			const ucReturn: UseCaseResponse = {
				stores: [],
			};

			const responseMapper = {
				statusCode: StatusCodes.OK,
				data: ucReturn.stores
			};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute").mockResolvedValue(ucReturn);
			const spyOnMockMapper = jest.spyOn(MockResponseMapper.prototype, "mapUseCaseResponseToApiResponse").mockReturnValue(responseMapper);
			const spyOnResponseSend = jest.spyOn(response, "send");

			try {
				const findNearestStoresHandler: FindNearestStoresHandler =
					new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnMockMapper).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(200, responseMapper);
		});

		it("should send a 400 error when no coordinates and limit provided", async () => {
			const response = httpMocks.createResponse();
			const request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					limit: 5
				}
			});

			const responseMapper = {
				statusCode: StatusCodes.BAD_REQUEST,
				error: "Both geographic coordinates should be provided"
			};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute");
			const spyOnMockMapper = jest.spyOn(MockResponseMapper.prototype, "mapUseCaseResponseToApiResponse");
			const spyOnMockMapperError = jest.spyOn(MockResponseMapper.prototype, "mapErrorToApiResponse").mockReturnValue(responseMapper);
			const spyOnResponseSend = jest.spyOn(response, "send");
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);

			try {
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).not.toHaveBeenCalled();
			expect(spyOnMockMapper).not.toHaveBeenCalled();
			expect(spyOnMockMapperError).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(400, responseMapper);
		});

		it("should send a 400 error with only latitude provided (limit correctly provided)", async () => {
			const response = httpMocks.createResponse();
			const request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					latitude: 5,
					limit: 5
				}
			});

			const responseMapper = {
					statusCode: StatusCodes.BAD_REQUEST,
					error: "Both geographic coordinates should be provided"
				};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute");
			const spyOnMockMapper = jest.spyOn(MockResponseMapper.prototype, "mapUseCaseResponseToApiResponse");
			const spyOnMockMapperError = jest.spyOn(MockResponseMapper.prototype, "mapErrorToApiResponse").mockReturnValue(responseMapper);
			const spyOnResponseSend = jest.spyOn(response, "send");
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);

			try {
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).not.toHaveBeenCalled();
			expect(spyOnMockMapper).not.toHaveBeenCalled();
			expect(spyOnMockMapperError).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(400, responseMapper);
		});

		it("should send a 500 error when an unexpected error ocurs", async () => {
			const response = httpMocks.createResponse();
			const request = httpMocks.createRequest({
				method: 'GET',
				url: '/search',
				query: {
					latitude: 5,
					longitude: 5,
					limit: 5
				}
			});
			const message = 'MongoDB has run out of storage.';
			const responseMapper = {
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
					error: message
				};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute").mockRejectedValue(new Error(message));
			const spyOnMockMapper = jest.spyOn(MockResponseMapper.prototype, "mapUseCaseResponseToApiResponse");
			const spyOnMockMapperError = jest.spyOn(MockResponseMapper.prototype, "mapErrorToApiResponse").mockReturnValue(responseMapper);
			const spyOnResponseSend = jest.spyOn(response, "send");

			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(logger), new MockResponseMapper(), logger, apiVersion);

			await findNearestStoresHandler.handler(request, response, next);
	
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnMockMapper).not.toHaveBeenCalled();
			expect(spyOnMockMapperError).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(500, responseMapper);
		});


	});
});
