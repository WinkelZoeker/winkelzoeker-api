import "../../../../../../../loadEnvVariables";

import { StatusCodes } from "http-status-codes";

import ResponseMapper from "../../../../../../../../../src/adapters/controllers/interfaces/responseMapper"
import FindNearestStoresResponseMapper from "../../../../../../../../../src/adapters/controllers/rest-api/restify/v1/use-case-controllers/find-nearest-store/findNearestStoresResponseMapper";
import { UseCaseResponse } from "../../../../../../../../../src/usecases/ports/infrastructure";
import { ResponseError } from "../../../../../../../../../src/adapters/controllers/models";


const useCaseResponse: UseCaseResponse = {
	stores: [
		{
			name: "Name A",
			address: "AddressStraat, 1"
		},
		{
			name: "Name B",
			address: "AddressStraat, 2"
		}
	],
};


describe("FindNearestStoresResponseMapper", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("mapUseCaseResponseToApiResponse", () => {
		it("Should map a UseCaseResponse to an ApiResponse", () => {

			const findNearestStoresResponseMapper: ResponseMapper = new FindNearestStoresResponseMapper();

			const apiResponse =
				findNearestStoresResponseMapper.mapUseCaseResponseToApiResponse(useCaseResponse);

			const expectedResponse = {
				statusCode: StatusCodes.OK,
				data: useCaseResponse.stores
			};
			expect(apiResponse).toEqual(expectedResponse);
		});
	});

	describe("mapErrorToApiResponse", () => {
		it("Should map an Error to an ApiResponse", () => {
			const findNearestStoresResponseMapper: ResponseMapper = new FindNearestStoresResponseMapper();

			const apiResponse =
				findNearestStoresResponseMapper.mapErrorToApiResponse(
					new ResponseError(StatusCodes.BAD_REQUEST, "Both geographic coordinates should be provided"));

			const expectedResponse = {
				statusCode: StatusCodes.BAD_REQUEST,
				error: "Both geographic coordinates should be provided"
			};

				expect(apiResponse).toEqual(expectedResponse);
		});
	});

});
