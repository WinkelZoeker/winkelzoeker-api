import "../loadEnvVariables";

import { GeoLocation } from "../../../src/core";
import { distanceInMeters } from "../../../src/lib/coordinateUtils";

describe("Coordinate Utils", () => {

	describe("distanceInMeters", () => {
		it("Should return 0km from same location ", () => {
			const origin = new GeoLocation(1, 1);
			const destination = new GeoLocation(1, 1);

			const distance = distanceInMeters(origin, destination);

			expect(distance).toBeDefined();
			expect(distance).toEqual(0);
		});

		it("Should return 157 km from (1, 1) to (2, 2) ", () => {
			const origin = new GeoLocation(2, 2);
			const destination = new GeoLocation(1, 1);

			const distanceKm = Math.round(distanceInMeters(origin, destination)/1000);

			expect(distanceKm).toBeDefined();
			expect(distanceKm).toEqual(157);
		});

		it("Should return 9790 km from São Paulo-Veghel ",  () => {
			const saoPaulo = new GeoLocation(-23.550520, -46.633309);
			const veghel = new GeoLocation(51.6157885, 5.5392399);

			const distanceKm = Math.round(distanceInMeters(saoPaulo, veghel)/1000);

			expect(distanceKm).toBeDefined();
			expect(distanceKm).toEqual(9790);
		});

	});

});
