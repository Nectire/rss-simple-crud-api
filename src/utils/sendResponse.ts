
import { ServerResponse } from 'http';
import { StatusCode, StatusMessage } from '../enums';
import { Message, User } from '../types';
import headers from './headers';

export default function sendResponse(data: User | User[] | Message, res: ServerResponse, 
  headStatus: { status: StatusCode; message: StatusMessage}) {
  res
    .writeHead(headStatus.status, headStatus.message, headers)
    .end(JSON.stringify(data));
}