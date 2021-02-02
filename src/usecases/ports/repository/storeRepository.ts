import { CRUDRepository } from '../infrastructure';
import { Store, GeoLocation } from '../../../core';

export default interface StoreRepository extends CRUDRepository<Store, string> {
  findNearest: (geoLocation: GeoLocation, limit: number) => Promise<Store[]>;
}
