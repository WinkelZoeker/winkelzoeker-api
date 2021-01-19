export default abstract class WebAdapterError extends Error {
  public stack: any;

  public data: any;

  public code: string;

  constructor(message: string, stack: any, data: any = {}) {
    super(message);
    this.code = '';
    this.data = data;
    this.stack = stack;
  }
}
