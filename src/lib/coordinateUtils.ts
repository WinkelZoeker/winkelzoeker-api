import haversine from 'haversine-distance'
import GeoLocation from "../core/geoLocation";
/**
 * Wrapper for external libraries that calculate the haversine distance, in meters
 * 
 * @param  {GeoLocation} origin
 * @param  {GeoLocation} destination
 * @returns number
 */
function distanceInMeters(origin: GeoLocation, destination: GeoLocation): number {
	return haversine(
		{latitude: origin.latitude, longitude: origin.longitude},
		{latitude: destination.latitude, longitude: destination.longitude}
	);
}

export { distanceInMeters }
