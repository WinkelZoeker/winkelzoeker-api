import { distanceInMeters } from "../lib/coordinateUtils";

/**
 * Wrapper class for geolocation data
 */
export default class GeoLocation {
	/**
	 * @constructor
	 * @param  {number} latitude
	 * @param  {number} longitude
	 */
	constructor(public latitude: number, public longitude: number) {}

	/**
	 * @param  {GeoLocation} destination coordinates
	 * @returns {number} distance in meters to destination 
	 */
	public distanceTo(destination: GeoLocation): number {
		return distanceInMeters(this, destination);
	}
}
