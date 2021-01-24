import mongoose, { Document, Schema } from 'mongoose';

import Store from '../../core/store';
import StoreRepository from '../../usecases/ports/repository/storeRepository';
import MappingException from '../controllers/exceptions/mappingException';
import AbstractMongoRepository from './abstractMongoRepository';
import ModelMapper from './modelMapper';
import storeModel, { StoreDocument } from './schemas/storeSchema';

class StoreModelMapper implements ModelMapper<Store> {
	mapToCoreModel(element: any): Store {
		try {
			return {
				city: element.city,
				postalCode: element.postalCode,
				street: element.street,
				street2: element.street2,
				street3: element.street3,
				addressName: element.addressName,
				uuid: element.uuid,
				longitude: element.longitude,
				latitude: element.latitude,
				complexNumber: element.complexNumber,
				showWarningMessage: element.showWarningMessage,
				todayOpen: element.todayOpen,
				locationType: element.locationType,
				collectionPoint: element.collectionPoint,
				sapStoreID: element.sapStoreID,
				todayClose: element.todayClose
			} as Store;
		} catch (error) {
			throw new MappingException(`Error mapping object ${JSON.stringify(element, null, 2)}`, error);
		}
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
