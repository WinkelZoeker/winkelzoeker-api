import { distanceInMeters } from "../lib/coordinateUtils";

export default class GeoLocation {

	constructor(public latitude: number, public longitude: number) {}

	public distanceTo(destination: GeoLocation): number {
		return distanceInMeters(this, destination);
	}
}
