import "../../../../../../../loadEnvVariables";

import { FindNearestStoresController } from "../../../../../../../../../src/adapters/controllers/rest-api/restify/v1/use-case-controllers/find-nearest-store/findNearestStoresController";
import { UseCase } from "../../../../../../../../../src/usecases/ports/infrastructure";
import ConsoleLogger from "../../../../../../../../../src/adapters/infrastructure/consoleLogger";
import { Store } from "../../../../../../../../../src/core";


const storesCollection: Store[] = [
	{
		"city": "Aalsmeer",
		"postalCode": "1431 HN",
		"street": "Ophelialaan",
		"street2": "124",
		"street3": "",
		"addressName": "Jumbo Aalsmeer Ophelialaan",
		"uuid": "gssKYx4XJwoAAAFbn.BMqPTb",
		"longitude": 4.762433,
		"latitude": 52.264417,
		"complexNumber": "33010",
		"showWarningMessage": true,
		"todayOpen": "08:00",
		"locationType": "SupermarktPuP",
		"collectionPoint": true,
		"sapStoreID": "3178",
		"todayClose": "22:00"
	}
];

class MockUseCase implements UseCase {
	execute(input: any): Promise<any> { throw new Error("Method not implemented."); }
}

describe("FindNearestStoresController", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("execute", () => {
		it("should NOT throw an exception with correct coordinates and limit provided", async () => {

			const event = {
				latitude: 1.2345,
				longitude: 5.4321,
				limit: 5
			};

			const spyOnMockUseCase =
				jest.spyOn(MockUseCase.prototype, "execute")
				.mockResolvedValue(storesCollection);

			let result = {};
			try {
				const controller = new FindNearestStoresController(new MockUseCase());
				result = await controller.execute(event, new ConsoleLogger());
			} catch (error) {
				expect(false).toBeTruthy();
			}

			expect(spyOnMockUseCase).toHaveBeenCalled();
			expect(result).toEqual({stores: storesCollection});
		});


	});

});
