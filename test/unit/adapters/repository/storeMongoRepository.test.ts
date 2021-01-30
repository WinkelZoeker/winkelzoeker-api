import "../../loadEnvVariables";

import Store from "../../../../src/core/store";
import ModelMapper from "../../../../src/adapters/repository/modelMapper";
import StoreMongoRepository, { StoreModelMapper } from "../../../../src/adapters/repository/storeMongoRepository"
import MappingException from "../../../../src/adapters/controllers/exceptions/mappingException";

const mongoElement = {
	"city": "Aalsmeer",
	"postalCode": "1431 HN",
	"street": "Ophelialaan",
	"street2": "124",
	"street3": "",
	"addressName": "Jumbo Aalsmeer Ophelialaan",
	"uuid": "gssKYx4XJwoAAAFbn.BMqPTb",
	"longitude": "4.762433",
	"latitude": "52.264417",
	"complexNumber": "33010",
	"showWarningMessage": true,
	"todayOpen": "08:00",
	"locationType": "SupermarktPuP",
	"collectionPoint": true,
	"sapStoreID": "3178",
	"todayClose": "22:00"
};
const mappedElement = {
	city: "Aalsmeer",
	postalCode: "1431 HN",
	street: "Ophelialaan",
	street2: "124",
	street3: "",
	addressName: "Jumbo Aalsmeer Ophelialaan",
	uuid: "gssKYx4XJwoAAAFbn.BMqPTb",
	longitude: 4.762433,
	latitude: 52.264417,
	complexNumber: "33010",
	showWarningMessage: true,
	todayOpen: "08:00",
	locationType: "SupermarktPuP",
	collectionPoint: true,
	sapStoreID: "3178",
	todayClose: "22:00"
};

describe("StoreModelMapper", () => {
	describe("mapToCoreModel", () => {
		it("should map a mongo result into a Store object", async () => {
			const storeModelMapper: ModelMapper<Store> = new StoreModelMapper();
			const mapping = storeModelMapper.mapToCoreModel(mongoElement);
			expect(mapping).toMatchObject(mappedElement);
		});
		it("should throw an error with invalid coordinates", async () => {
			const element = {...mongoElement,
				latitude: 'ABC',
				longitude: 'XYZ'
			};
			expect(() => {
				const storeModelMapper: ModelMapper<Store> = new StoreModelMapper();
				const mapped = storeModelMapper.mapToCoreModel(element);
			}).toThrow(MappingException);
		});
	});
});


describe("StoreMongoRepository", () => {

	describe("documentToCoreModelMapper", () => {
		it("should return an instance of StoreModelMapper", async () => {
			const repository = new StoreMongoRepository();
			const mapper = repository.documentToCoreModelMapper;
			expect(mapper instanceof StoreModelMapper).toBe(true);
		});
	});

	describe("repositoryDocumentModel", () => {
		it("should return an instance of mongoose.Model<Store>", async () => {
			const repository = new StoreMongoRepository();
			expect(repository.repositoryDocumentModel).toBeDefined();
		});
	});
});
