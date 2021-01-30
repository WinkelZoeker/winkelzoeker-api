import "../../loadEnvVariables";

import mongoose, { Document, Schema } from 'mongoose';
import Store from "../../../../src/core/store";
import AbstractMongoRepository from "../../../../src/adapters/repository/abstractMongoRepository";
import ModelMapper from '../../../../src/adapters/repository/modelMapper';

interface MockModel {
	key: string,
	field: string
}

interface MockDocument extends Document {
	key: string,
	field: string
}

const mockSchema: Schema = new Schema({
	key: { type: String, required: true },
	field: { type: String, required: true }
});

class MockModelMapper implements ModelMapper<MockModel> {
	mapToCoreModel(element: any): MockModel  { throw new Error('Method not implemented.'); }
}

class MockMongoRepository extends AbstractMongoRepository<MockModel, MockDocument, string> {
	public get documentToCoreModelMapper(): ModelMapper<MockModel>  { throw new Error('Method not implemented.'); }
	public get repositoryDocumentModel(): mongoose.Model<MockDocument>  { throw new Error('Method not implemented.'); }
}

const mockDocument =  mongoose.model<MockDocument>('MockDocument', mockSchema);

describe("AbstractMongoRepository", () => {

	// const records = await this.documentModel.find();
	// return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
	const mockResult = {
		key: 'key 1',
		field: 'field 1'
	};
	const mappedResult: MockModel = {
		key: 'key 1',
		field: 'field 1'
	};

	describe("findAll", () => {

    beforeAll(() => {
			console.log(`#############################################################`);
			mockDocument.find = jest.fn().mockResolvedValue([mockResult])
		});

		it("should return a collection", async () => {
			const repository: 
				AbstractMongoRepository<MockModel, MockDocument, string> = new MockMongoRepository();
			
		
			// const spyOnMongoFind = 
			// 	jest.spyOn(mongoose.model<MockDocument>('MockDocument', mockSchema).prototype, "find")
			// 	.mockResolvedValue([mockResult]);
			const spyOnGetDocumentModel = 
				jest.spyOn(MockMongoRepository.prototype, "repositoryDocumentModel", "get").mockReturnValue(mockDocument);
			const spyOnGetMapper = 
				jest.spyOn(MockMongoRepository.prototype, "documentToCoreModelMapper", "get").mockReturnValue(new MockModelMapper());
			const spyOnMapping = 
				jest.spyOn(MockModelMapper.prototype, "mapToCoreModel").mockReturnValue(mappedResult);

			const result = repository.findAll();

			// expect(spyOnMongoFind).toBeCalled();
			expect(spyOnGetMapper).toBeCalled();
			expect(spyOnMapping).toBeCalled();

		});
	});
	describe("findByKey", () => {
		it("should yada yada yada...", async () => {
		});
	});
	describe("findByKey", () => {
		it("should yada yada yada...", async () => {
		});
	});
	describe("add", () => {
		it("should yada yada yada...", async () => {
		});
	});
	describe("update", () => {
		it("should yada yada yada...", async () => {
		});
	});
	describe("exists", () => {
		it("should yada yada yada...", async () => {
		});
	});

	// async findAll() : Promise<T[]> {
	// 	const records = await this.documentModel.find();
	// 	return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
	// }

	// async findByKey(key: K) : Promise<T | undefined> {
	// 	return undefined;
	// }

	// async add(entity: T) : Promise<void>{
	// }

	// async update(entity: T) : Promise<void>{
	// }

	// async exists(key: K) : Promise<boolean>{
	// 	return false;
	// }

});
