import { Store, GeoLocation } from "../../core";
import { distanceInMeters } from "../../lib/coordinateUtils";
import { UseCase } from "../ports/infrastructure";
import StoreRepository from "../ports/repository/storeRepository";

export default class FindNearestStoresUseCase implements UseCase {

	constructor(private storeRepository: StoreRepository) {
	}

	async execute(input: GeoLocation): Promise<Store[]> {

		const mappedRecords = await this.storeRepository.findAll();

		const mappedRecordsWithDistance = mappedRecords.map((record: Store) => {
			const distanceKm: number = distanceInMeters(input, new GeoLocation(record.latitude, record.longitude))/1000;
			return { ...record, distanceKm };
		})
			.sort((storeA, storeB) => storeA.distanceKm > storeB.distanceKm ? 1 : -1 )
			.slice(0, 5);

			console.log(`Stores: ${JSON.stringify(mappedRecordsWithDistance, null, 2)}`);

		return mappedRecords.slice(1, 3);
	}
}
