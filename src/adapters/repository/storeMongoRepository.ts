import mongoose, { Document, Schema } from 'mongoose';

import Store from '../../core/store';
import StoreRepository from '../../usecases/ports/repository/storeRepository';
import AbstractMongoRepository from './abstractMongoRepository';
import ModelMapper from './modelMapper';
import storeModel, { StoreDocument } from './schemas/storeSchema';

class StoreModelMapper implements ModelMapper<Store> {
	mapToCoreModel(element: any): Store {
		const store: Store = {...element};
		store.sapStoreID = 'SECRET';
		return store;
	}
}

export default class StoreMongoRepository extends AbstractMongoRepository<Store, StoreDocument, string> implements StoreRepository {

	public get documentToCoreModelMapper(): ModelMapper<Store> {
		return new StoreModelMapper();
	}

	public get documentModel(): mongoose.Model<StoreDocument> {
		return storeModel;
	}
}
