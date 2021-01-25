import "../loadEnvVariables";

import logicalXOR from "../../../src/lib/logicalXOR";

describe("logicalXOR", () => {

	it("Should return FALSE for equal inputs ", () => {
		const outputTrue = logicalXOR(true, true);
		const outputFalse = logicalXOR(false, false);

		expect(outputTrue).toBeDefined();
		expect(outputFalse).toBeDefined();

		expect(outputTrue).toBeFalsy();
		expect(outputFalse).toBeFalsy();
	});

	it("Should return TRUE for different inputs ", () => {
		const outputTrueFalse = logicalXOR(true, false);
		const outputFalseTrue = logicalXOR(false, true);

		expect(outputTrueFalse).toBeDefined();
		expect(outputFalseTrue).toBeDefined();

		expect(outputTrueFalse).toBeTruthy();
		expect(outputFalseTrue).toBeTruthy();
	});

});
