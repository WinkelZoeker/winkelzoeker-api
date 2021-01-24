import mongoose, { Document, Schema } from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';
import { StoreDocument } from './schemas/storeSchema';


export default abstract class AbstractMongoRepository<T, D extends Document<any>, K> implements CRUDRepository<T,K> {

	public abstract get documentToCoreModelMapper(): ModelMapper<T>;
	public abstract get documentModel(): mongoose.Model<D>;

	constructor() {
	}


	async findAll() : Promise<T[]> {
		const records = await this.documentModel.find();
		return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
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
}


