import { distanceInKm } from "../lib/coordinateUtils";

export default class GeoLocation {

	constructor(public longitude: number,
		public latitude: number
	) {}

	public distanceTo(destination: GeoLocation): number {
		return distanceInKm(this, destination);
	}
}
