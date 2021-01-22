import mongoose from 'mongoose'
import { CRUDRepository } from '../../usecases/ports/infrastructure';
import ModelMapper from './modelMapper';

export default abstract class AbstractMongoRepository<T,K> implements CRUDRepository<T,K> {

	public abstract getDocumentToCoreModelMapper(): ModelMapper<T>;

	public abstract get collection(): string;

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

  constructor() {

		this.connect();

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


