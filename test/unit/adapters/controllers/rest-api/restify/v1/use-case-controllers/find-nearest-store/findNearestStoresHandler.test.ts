import "../../../../../../../loadEnvVariables";


import httpMocks from 'node-mocks-http';
import { StatusCodes } from "http-status-codes";

import ConsoleLogger from "../../../../../../../../../src/adapters/infrastructure/consoleLogger";
import { FindNearestStoresHandler } from "../../../../../../../../../src/adapters/controllers/rest-api/restify/v1/use-case-controllers/find-nearest-store/findNearestStoresHandler";
import BadRequestException from "../../../../../../../../../src/adapters/controllers/exceptions/badRequestException";
import { Logger, UseCaseResponse } from "../../../../../../../../../src/usecases/ports/infrastructure";
import AbstractController from "../../../../../../../../../src/adapters/controllers/rest-api/abstractController";
import ResponseMapper from "../../../../../../../../../src/adapters/controllers/interfaces/responseMapper"
import BaseException from "../../../../../../../../../src/adapters/controllers/exceptions/baseException";
import { ApiResponse, ResponseError } from "../../../../../../../../../src/adapters/controllers/models";

const logger = new ConsoleLogger();
const apiVersion = 'v1';
function next(object?: any): void { }

class MockController extends AbstractController {
	public execute(event: any, logger: Logger): Promise<UseCaseResponse> { throw new Error("Method not implemented."); }
}

export default class MockResponseMapper implements ResponseMapper {
	mapUseCaseResponseToApiResponse(useCaseResponse: UseCaseResponse): ApiResponse {
		throw new Error("Method not implemented.");
	}
	mapErrorToApiResponse(error: BaseException): ApiResponse {
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
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
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
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
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
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).not.toThrow(BadRequestException);
		});

		it("should throw an exception with only latitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				latitude: 1.0,
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with only longitude provided (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
			const queryParams = {
				longitude: 1.0,
				limit: 5
			};
			expect(() => {
				findNearestStoresHandler.validateRequest(queryParams)
			}).toThrow(BadRequestException);
		});

		it("should throw an exception with one of the coordinates with wrong format (limit correctly provided)", async () => {
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
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
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
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
					new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnMockMapper).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(200, responseMapper);
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
					new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);
				await findNearestStoresHandler.handler(request, response, next);
			} catch (error) {
				expect(false).toBeTruthy();
			}
			expect(spyOnMockController).toHaveBeenCalled();
			expect(spyOnMockMapper).toHaveBeenCalled();
			expect(spyOnResponseSend).toHaveBeenCalledWith(200, responseMapper);
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

			const responseMapper = {
					statusCode: StatusCodes.BAD_REQUEST,
					error: new ResponseError(StatusCodes.BAD_REQUEST, "Both geographic coordinates should be provided")
				};

			const spyOnMockController = jest.spyOn(MockController.prototype, "execute");
			const spyOnMockMapper = jest.spyOn(MockResponseMapper.prototype, "mapUseCaseResponseToApiResponse");
			const spyOnMockMapperError = jest.spyOn(MockResponseMapper.prototype, "mapErrorToApiResponse").mockReturnValue(responseMapper);
			const spyOnResponseSend = jest.spyOn(response, "send");
			const findNearestStoresHandler: FindNearestStoresHandler =
				new FindNearestStoresHandler(new MockController(), new MockResponseMapper(), logger, apiVersion);

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


	});

});
