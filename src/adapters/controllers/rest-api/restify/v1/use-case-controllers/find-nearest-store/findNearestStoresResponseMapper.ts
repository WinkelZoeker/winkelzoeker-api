import { StatusCodes } from "http-status-codes";
import BaseException from "../../../../../exceptions/baseException";
import { ApiResponse, Resource, ResponseError } from "../../../../../models";
import { UseCaseResponse } from "src/usecases/ports/infrastructure";
import ResponseMapper from "../../../../../interfaces/responseMapper";

export default class FindNearestStoresResponseMapper implements ResponseMapper {

	mapUseCaseResponseToApiResponse(useCaseResponse: UseCaseResponse): ApiResponse {
		return {
			statusCode: StatusCodes.OK,
			data: useCaseResponse.stores
		};
	}

	mapErrorToApiResponse(error: BaseException): ApiResponse {
		return {
			statusCode: StatusCodes.BAD_REQUEST,
			error: new ResponseError(StatusCodes.BAD_REQUEST, error.message)
		};
	}
}
