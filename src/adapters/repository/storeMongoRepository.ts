import Store from '../../core/store';
import StoreRepository from '../../usecases/ports/repository/storeRepository';
import AbstractMongoRepository from './abstractMongoRepository';
import ModelMapper from './modelMapper';
import storeSchema from './schemas/StoreSchema';

class StoreModelMapper implements ModelMapper<Store> {
	mapToCoreModel(element: any): Store {
		return {} as Store;
	}
}

export default class StoreMongoRepository extends AbstractMongoRepository<Store, string> implements StoreRepository {

	public get collection(): string {
		return "stores";
	}

	public getDocumentToCoreModelMapper(): ModelMapper<Store> {
		return new StoreModelMapper();
	}




	public async getAll() {

		let total = -1;

		// const query = storeSchema.find();
		const stores = await storeSchema.find();
		total = stores.length;

		console.log(`store[0] = ${JSON.stringify(stores[0], null, 2)}`);

		console.log(`Total = ${total}`);

		console.log(`Type store[0] = ${typeof stores[0]}`);

		return total;
	}

}
