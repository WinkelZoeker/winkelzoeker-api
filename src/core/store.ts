/**
 * Store object
 */
export default interface Store {
	city: string;
	postalCode: string;
	street: string;
	street2: string;
	street3: string;
	addressName: string;
	uuid: string;
	longitude: number;
	latitude: number;
	complexNumber: string;
	showWarningMessage: boolean;
	todayOpen: string;
	locationType: string;
	collectionPoint?: boolean;
	sapStoreID: string;
	todayClose: string;
}
