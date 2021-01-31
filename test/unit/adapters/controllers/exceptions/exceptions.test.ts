import "../../../loadEnvVariables";

import { StatusCodes } from "http-status-codes";
import { BadRequestException, InternalServerException, MappingException } from "../../../../../src/adapters/controllers/exceptions";


describe("Exceptions", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("BadRequestException", async () => {
		const data = {parameter: "longitude", error: "wrong format"};
		const error = new BadRequestException('Invalid parameters', data);

		expect(error).toBeDefined();
		expect(error.code).toEqual(StatusCodes.BAD_REQUEST);
		expect(error.message).toEqual('Invalid parameters');
		expect(error.data).toMatchObject(data);
	});

	it("InternalServerException", async () => {
		const data = {};
		const error = new InternalServerException('MongoDB has crashed', data);

		expect(error).toBeDefined();
		expect(error.code).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(error.message).toEqual('MongoDB has crashed');
		expect(error.data).toMatchObject(data);
	});

	it("InternalServerException - no data", async () => {
		const error = new InternalServerException('MongoDB has crashed');

		expect(error).toBeDefined();
		expect(error.code).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(error.message).toEqual('MongoDB has crashed');
	});

	it("MappingException", async () => {
		const data = {};
		const error = new MappingException('Latitude as \'ABC\' cannot be mapped', data);

		expect(error).toBeDefined();
		expect(error.code).toEqual(StatusCodes.BAD_REQUEST);
		expect(error.message).toEqual('Latitude as \'ABC\' cannot be mapped');
		expect(error.data).toMatchObject(data);
	});
});
