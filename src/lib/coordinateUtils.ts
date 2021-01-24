import GeoLocation from "../core/geoLocation";

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {

	const earthRadiusInKm = 6371.0;
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadiusInKm * c; // Distance in km
}

function deg2rad(degrees: number): number {
  return degrees * (Math.PI/180.0)
}

function distanceInKm(origin: GeoLocation, destination: GeoLocation) {
	return getDistanceFromLatLonInKm(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
}

export { distanceInKm }
