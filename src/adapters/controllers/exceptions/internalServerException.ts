import BaseException from "./baseException";
export default class InternalServerException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(500, message);
  }
}
