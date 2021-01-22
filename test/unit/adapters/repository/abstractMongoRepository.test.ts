// export default class AbstractMongoRepository<T,K> implements CRUDRepository<T,K>

const mongoose = require("mongoose");

import Store from "../../../../src/core/store";
import AbstractMongoRepository from "../../../../src/adapters/repository/abstractMongoRepository";
import "../../loadEnvVariables";

class MockMongoRepository extends AbstractMongoRepository<Store, string> {
	public get collection(): string {
		return "stores";
	}
}

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

describe("AbstractMongoRepository", () => {

	describe("Method 1", () => {
		it("should yada yada yada...", async () => {



			const amr = new MockMongoRepository();
			amr.connect();


		});

	});

});
