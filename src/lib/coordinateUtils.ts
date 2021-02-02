import haversine from 'haversine-distance'
import GeoLocation from "../core/geoLocation";

function distanceInMeters(origin: GeoLocation, destination: GeoLocation): number {
	return haversine(
		{latitude: origin.latitude, longitude: origin.longitude},
		{latitude: destination.latitude, longitude: destination.longitude}
	);
}

export { distanceInMeters }
