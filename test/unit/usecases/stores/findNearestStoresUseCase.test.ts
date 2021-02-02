import "../../loadEnvVariables";

import { GeoLocation, Store } from "../../../../src/core";
import StoreRepository from "../../../../src/usecases/ports/repository/storeRepository";
import FindNearestStoresUseCase from "../../../../src/usecases/stores/findNearestStoresUseCase";
import { UseCaseRequest } from "../../../../src/usecases/ports/infrastructure";

class MockStoreRepository implements StoreRepository {
	async findNearest(geoLocation: GeoLocation, limit: number): Promise<Store[]>  { throw new Error("Method not implemented."); }
	async findAll(): Promise<Store[]> { throw new Error("Method not implemented."); }
	async findByKey(_key: string): Promise<Store | undefined> { throw new Error("Method not implemented."); }
	async add(_entity: Store): Promise<void> { throw new Error("Method not implemented."); }
	async update(_entity: Store): Promise<void> { throw new Error("Method not implemented."); }
	async exists(_key: string): Promise<boolean> { throw new Error("Method not implemented."); }
}

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
	},
	{
		"city": "'s Gravendeel",
		"postalCode": "3295 BD",
		"street": "Kerkstraat",
		"street2": "37",
		"street3": "",
		"addressName": "Jumbo 's Gravendeel Gravendeel Centrum",
		"uuid": "EOgKYx4XFiQAAAFJa_YYZ4At",
		"longitude": 4.615551,
		"latitude": 51.778461,
		"complexNumber": "33249",
		"showWarningMessage": true,
		"todayOpen": "08:00",
		"locationType": "SupermarktPuP",
		"collectionPoint": true,
		"sapStoreID": "3605",
		"todayClose": "20:00"
	},
	{
		"city": "'s-Heerenberg",
		"postalCode": "7041 JE",
		"street": "Stadsplein",
		"street2": "71",
		"street3": "",
		"addressName": "Jumbo 's-Heerenberg Stadsplein",
		"uuid": "7ewKYx4Xqp0AAAFIHigYwKrH",
		"longitude": 6.245829,
		"latitude": 51.874272,
		"complexNumber": "30170",
		"showWarningMessage": true,
		"todayOpen": "08:00",
		"locationType": "Supermarkt",
		"sapStoreID": "4670",
		"todayClose": "21:00"
	}
];

describe("FindNearestStoresUseCase", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("execute", () => {
		it("should return the correct output", async () => {
			const storeRepository: StoreRepository = new MockStoreRepository();
			const findNearestStoreUC = new FindNearestStoresUseCase(storeRepository);

			const spyOnStoreRepository = jest
				.spyOn(MockStoreRepository.prototype, "findNearest")
				.mockResolvedValue(storesCollection);

				const useCaseRequest: UseCaseRequest = {
				geoLocation: new GeoLocation(51.4416, 5.4697),
				limit: 3
			};

			const result = await findNearestStoreUC.execute(useCaseRequest);
			expect(spyOnStoreRepository).toHaveBeenCalled();

			expect(result[0].uuid).toEqual("EOgKYx4XFiQAAAFJa_YYZ4At");
			expect(result[1].uuid).toEqual("7ewKYx4Xqp0AAAFIHigYwKrH");
			expect(result[2].uuid).toEqual("gssKYx4XJwoAAAFbn.BMqPTb");
		});

	});

});
