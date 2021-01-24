export default abstract class BaseException extends Error {
  public data: any;

  constructor(message: string,  data: any = {}) {
    super(message);
    this.data = data;
  }
}
