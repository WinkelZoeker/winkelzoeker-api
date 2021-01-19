export default interface Logger {
  debug(message: any, data?: any): void;
  info(message: any, data?: any): void;
  warning(error: Error): void;
  error(error: Error): void;
  fatal(error: Error): void;
}
