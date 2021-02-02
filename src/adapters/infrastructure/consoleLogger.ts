import { Logger } from "../../usecases/ports/infrastructure";

export default class ConsoleLogger implements Logger {
  debug(message: any, _data?: any): void {
    console.log(message);
  }

  info(message: any, _data?: any): void {
    console.info(message);
  }

  warning(error: Error): void {
    console.warn(error.message, error);
  }

  error(error: Error): void {
    console.error(error.message, error);
  }

  fatal(error: Error): void {
    console.error(error.message, error);
  }
}
