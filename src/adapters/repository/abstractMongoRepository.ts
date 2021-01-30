import mongoose, { Document, Schema } from 'mongoose'
import { join } from 'path';
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';
import { StoreDocument } from './schemas/storeSchema';


export default abstract class AbstractMongoRepository<T, D extends Document<any>, K> implements CRUDRepository<T,K> {

	public abstract get documentToCoreModelMapper(): ModelMapper<T>;
	public abstract get repositoryDocumentModel(): mongoose.Model<D>;

	constructor() {
	}


	async findAll() : Promise<T[]> {
		console.log(`###### FINDALL`);

		try {
			console.log(`###### this.documentModel => ${JSON.stringify(this.repositoryDocumentModel, null, 2)}`);
			const records = await this.repositoryDocumentModel.find();



			return records.map(record => this.documentToCoreModelMapper.mapToCoreModel(record));
			} catch (error) {
				console.log(`###### ERROR => ${JSON.stringify(error, null, 2)}`);

				return [];
		}
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


