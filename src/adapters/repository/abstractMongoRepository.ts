import mongoose, { Schema } from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';
import { StoreDocument } from './schemas/storeSchema';


const storeSchema: Schema = new Schema({
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	street: { type: String, required: true },
	street2: { type: String, required: true },
	street3: { type: String, required: true },
	addressName: { type: String, required: true },
	uuid: { type: String, required: true },
	longitude: { type: String, required: true },
	latitude: { type: String, required: true },
	complexNumber: { type: String, required: true },
	showWarningMessage: { type: Boolean, required: true },
	todayOpen: { type: String, required: true },
	locationType: { type: String, required: true },
	collectionPoint: { type: Boolean, required: true },
	sapStoreID: { type: String, required: true },
	todayClose: { type: String, required: true }
});
export default abstract class AbstractMongoRepository<T, D, K> implements CRUDRepository<T,K> {

	public abstract getDocumentToCoreModelMapper(): ModelMapper<T>;

	public abstract get collection(): string;

	constructor() {

		this.connect();
		const collection = 'stores';

		const model:  mongoose.Model<mongoose.Document<any>> =  mongoose.model(collection, storeSchema);

		// const modelDoc =  mongoose.model<D>(collection, storeSchema);

	}


	connect(): void {
			// `mongodb+srv://winkelzoeker_database-user:<password>@cluster0.dyuls.mongodb.net/<dbname>?retryWrites=true&w=majority`;

			const connectionUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

			try {
				mongoose.connect(
					connectionUrl,
					{
						useNewUrlParser: true,
						useUnifiedTopology: true
					}
				)
				.then(() => console.log('MongoDB connected…'))
				.catch(err => console.log(err))


				//Get the default connection
				var db = mongoose.connection;

				//Bind connection to error event (to get notification of connection errors)
				db.on('error', console.error.bind(console, 'MongoDB connection error:'));
				} catch (error) {
					console.log(`Exception: ${JSON.stringify(error, null, 2)}`)
			}
	}

	async findByKey(key: K) : Promise<T | undefined> {
		return undefined;
	}

	async add(entity: T) : Promise<void>{
	}

	async update(entity: T) : Promise<void>{
	}

	async exists(key: K) : Promise<boolean>{
		return false;
	}

	async findAll() : Promise<T[]> {
		return [] as T[];
	}


}


