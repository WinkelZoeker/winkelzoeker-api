// export default class AbstractMongoRepository<T,K> implements CRUDRepository<T,K>

const mongoose = require("mongoose");

import Store from "../../../../src/core/store";
import AbstractMongoRepository from "../../../../src/adapters/repository/abstractMongoRepository";
import "../../loadEnvVariables";

// class MockMongoRepository extends AbstractMongoRepository<Store, string> {
// 	public get collection(): string {
// 		return "stores";
// 	}
// }

describe("AbstractMongoRepository", () => {

	describe("Method 1", () => {
		it("should yada yada yada...", async () => {
		});
	});
});
