import Store from "src/core/store";
import { UseCase } from "../ports/infrastructure";

export default class FindStoreUseCase implements UseCase {
  async execute(input: any): Promise<Store | undefined> {
		return undefined;
	}
}
