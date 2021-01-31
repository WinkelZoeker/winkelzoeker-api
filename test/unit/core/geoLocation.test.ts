import "../loadEnvVariables";

import { GeoLocation } from "../../../src/core";

describe("GeoLocation", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("distanceTo", () => {
		it("should return correct distance", () => {

			const eindhovenCoordinates = new GeoLocation( 51.4416, 5.4697 );
			const veghelCoordinates = new GeoLocation(51.6158, 5.5392 );

			const distance1to2 = eindhovenCoordinates.distanceTo(veghelCoordinates);
			const distance2to1 = eindhovenCoordinates.distanceTo(veghelCoordinates);

			expect(distance1to2).toEqual(distance2to1);
			expect(Math.round(distance1to2)).toBeCloseTo(19980);
		});

	});

});
