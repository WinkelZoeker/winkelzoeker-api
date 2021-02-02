import { ErrorSeverity, UseCaseRequest } from "../ports/infrastructure";
import { Store, GeoLocation } from "../../core";
import { distanceInMeters } from "../../lib/coordinateUtils";
import { UseCase } from "../ports/infrastructure";
import StoreRepository from "../ports/repository/storeRepository";
import { UseCaseError } from "../ports/infrastructure/errors/useCaseError";

export default class FindNearestStoresUseCase implements UseCase {

	constructor(private storeRepository: StoreRepository) {
	}

	
	async execute(input: UseCaseRequest): Promise<Store[]> {
		try {
			const records = await this.storeRepository.findNearest(input.geoLocation, input.limit);

			if (input.hasOwnProperty('geoLocation')) {
				const mappedRecordsWithDistance = records.map((record: Store) => {
					const distanceKm: number =
						distanceInMeters(
							input.geoLocation,
							new GeoLocation(record.latitude, record.longitude)) / 1000;
					return { ...record, distanceKm };
				})
					.sort((storeA, storeB) => storeA.distanceKm > storeB.distanceKm ? 1 : -1);
				
					return mappedRecordsWithDistance;
			}

			return records;
		} catch (error) {
			throw new UseCaseError({
				code: '1', /**  BUSINESS ERROR CODE, MAPPED SOMEWHERE, LIKE CONFLUENCE... */
				message: 'An error ocurred while fetching/mapping the results from FindNearestStoresUseCase.execute',
				severity: ErrorSeverity.ERROR,
				error
			}, error);
		}
	}
}
