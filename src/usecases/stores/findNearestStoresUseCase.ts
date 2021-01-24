import { UseCaseRequest } from "src/adapters/controllers/models";
import { Store, GeoLocation } from "../../core";
import { distanceInMeters } from "../../lib/coordinateUtils";
import { UseCase } from "../ports/infrastructure";
import StoreRepository from "../ports/repository/storeRepository";

export default class FindNearestStoresUseCase implements UseCase {

	constructor(private storeRepository: StoreRepository) {
	}

	async execute(input: UseCaseRequest): Promise<Store[]> {

		const mappedRecords = await this.storeRepository.findAll();

		const mappedRecordsWithDistance = mappedRecords.map((record: Store) => {
			const distanceKm: number = distanceInMeters(input.geoLocation, new GeoLocation(record.latitude, record.longitude))/1000;
			return { ...record, distanceKm };
		})
			.sort((storeA, storeB) => storeA.distanceKm > storeB.distanceKm ? 1 : -1 )
			.slice(0, input.maxItems - 1);

			// console.log(`Stores: ${JSON.stringify(mappedRecordsWithDistance, null, 2)}`);

		return [mappedRecordsWithDistance[0]];
	}
}
