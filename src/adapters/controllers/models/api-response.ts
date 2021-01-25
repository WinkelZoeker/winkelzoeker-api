import { StatusCodes } from 'http-status-codes';
import ResponseError from '../exceptions/responseError';
import Resource from './resource';

export default interface ApiResponse {
  statusCode: StatusCodes;
  data?: Resource | Resource[];
  error?: string;
}
