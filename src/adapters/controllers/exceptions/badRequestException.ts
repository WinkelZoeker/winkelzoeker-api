import BaseException from "./baseException";

export default class BadRequestException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(message);
  }
}
