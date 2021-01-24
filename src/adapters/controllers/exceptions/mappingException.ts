import BaseException from "./baseException";

export default class MappingException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(message);
  }
}
