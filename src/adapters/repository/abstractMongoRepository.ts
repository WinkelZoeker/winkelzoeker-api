import mongoose from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';

export default class AbstractMongoRepository<T,K> implements CRUDRepository<T,K> {

  constructor(private schema: mongoose.Schema, private dbConnection: mongoose.Connection) {
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


