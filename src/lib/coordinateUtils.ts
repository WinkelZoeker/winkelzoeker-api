import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import haversine from 'haversine-distance'
import GeoLocation from "../core/geoLocation";

function distanceInMeters(origin: GeoLocation, destination: GeoLocation): number {
	return haversine(
		{latitude: origin.latitude, longitude: origin.longitude},
		{latitude: destination.latitude, longitude: destination.longitude}
	);
}

export { distanceInMeters }