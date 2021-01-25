import "../../loadEnvVariables";

import ConsoleLogger from "../../../../src/adapters/infrastructure/consoleLogger";
import { Logger } from "../../../../src/usecases/ports/infrastructure";

describe("ConsoleLogger", () => {

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("debug", async () => {
		const spyOnConsole = jest.spyOn(console, "log");
		const logger: Logger = new ConsoleLogger();
		logger.debug('Debug message');
		expect(spyOnConsole).toBeCalled();
	});

	it("info", async () => {
		const spyOnConsole = jest.spyOn(console, "info");
		const logger: Logger = new ConsoleLogger();
		logger.info('Info message');
		expect(spyOnConsole).toBeCalled();
	});

	it("warning", async () => {
		const spyOnConsole = jest.spyOn(console, "warn");
		const logger: Logger = new ConsoleLogger();
		logger.warning(new Error('Warning message'));
		expect(spyOnConsole).toBeCalled();
	});

	it("error", async () => {
		const spyOnConsole = jest.spyOn(console, "error");
		const logger: Logger = new ConsoleLogger();
		logger.error(new Error('Error message'));
		expect(spyOnConsole).toBeCalled();
	});

	it("fatal", async () => {
		const spyOnConsole = jest.spyOn(console, "error");
		const logger: Logger = new ConsoleLogger();
		logger.fatal(new Error('Fatal message'));
		expect(spyOnConsole).toBeCalled();
	});
});
