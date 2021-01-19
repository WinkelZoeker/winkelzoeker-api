import { StatusCodes } from 'http-status-codes';
import WebAdapterError from './webAdapterError';
import Resource from './resource';

export default interface ApiResponse {
  statusCode: StatusCodes;
  data?: Resource | Resource[];
  error?: WebAdapterError;
}
