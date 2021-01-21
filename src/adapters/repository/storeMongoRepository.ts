import Store from '../../core/store';
import StoreRepository from '../../usecases/ports/repository/storeRepository';
import AbstractMongoRepository from './abstractMongoRepository';

export default class StoreMongoRepository extends AbstractMongoRepository<Store, string> implements StoreRepository {
}
