import mongoose, { Document, Schema } from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';
import { StoreDocument } from './schemas/storeSchema';


export default abstract class AbstractMongoRepository<T, D extends Document<any>, K> implements CRUDRepository<T,K> {

	public abstract getDocumentToCoreModelMapper(): ModelMapper<T>;

	public abstract get collection(): string;

	public abstract documentModel(): mongoose.Model<D>;


	constructor() {

		const collection = 'stores';

		// const model:  mongoose.Model<mongoose.Document<any>> =  mongoose.model(collection, storeSchema);

		// const modelDoc =  mongoose.model<D>(collection, storeSchema);

	}

	public async getAll() {

		let total = -1;

		const model:  mongoose.Model<mongoose.Document<any>> =  mongoose.model(this.collection, this.documentModel);


		// const query = storeSchema.find();
		const stores = await storeSchema.find();
		total = stores.length;

		console.log(`store[0] = ${JSON.stringify(stores[0], null, 2)}`);

		console.log(`Total = ${total}`);

		console.log(`Type store[0] = ${typeof stores[0]}`);

		return total;
	}


	async findByKey(key: K) : Promise<T | undefined> {
		return undefined;
	}

	async add(entity: T) : Promise<void>{
	}

	async update(entity: T) : Promise<void>{
	}

	async exists(key: K) : Promise<boolean>{
		return false;
	}

	async findAll() : Promise<T[]> {
		return [] as T[];
	}


}


