import { CRUDRepository } from '../infrastructure';
import Store  from '../../../core/store';

export default interface StoreRepository extends CRUDRepository<Store, string> {
}
