import "../../loadEnvVariables";

import { Logger } from 'winston';

import WebAppLogger from "../../../../src/adapters/infrastructure/webApplogger";
import { Logger as WZLogger } from "../../../../src/usecases/ports/infrastructure";

describe("WebAppLogger", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("debug", async () => {
		const loggerObj = new WebAppLogger();
		const spyOnWinston = jest.spyOn(loggerObj.logger, "info");
		loggerObj.debug('message');
		expect(spyOnWinston).toBeCalled();
	});

	it("info", async () => {
		const loggerObj = new WebAppLogger();
		const spyOnWinston = jest.spyOn(loggerObj.logger, "info");
		loggerObj.info('Info message');
		expect(spyOnWinston).toBeCalled();
	});

	it("warning", async () => {
		const loggerObj = new WebAppLogger();
		const spyOnWinston = jest.spyOn(loggerObj.logger, "warn");
		loggerObj.warning(new Error('Warning message'));
		expect(spyOnWinston).toBeCalled();
	});

	it("error", async () => {
		const loggerObj = new WebAppLogger();
		const spyOnWinston = jest.spyOn(loggerObj.logger, "error");
		loggerObj.error(new Error('Error message'));
		expect(spyOnWinston).toBeCalled();
	});

	it("fatal", async () => {
		const loggerObj = new WebAppLogger();
		const spyOnWinston = jest.spyOn(loggerObj.logger, "error");
		loggerObj.fatal(new Error('Fatal message'));
		expect(spyOnWinston).toBeCalled();
	});
});
