import { IncomingMessage } from 'http';
import { UserData } from '../types';

export const getRequestData = (request: IncomingMessage): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';
      request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};