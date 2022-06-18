import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { StatusCode, StatusMessage } from '../enums';
import { UserIdError, UserNotFoundError } from '../errors';

import { UserService } from "../services/userService";
import { UserData } from '../types';
import { getRequestData } from '../utils/getRequestBody';
import { handleError } from '../utils/handleError';
import headers from '../utils/headers';
import sendResponse from '../utils/sendResponse';

export class UserController {
    
  async getUsers(req: IncomingMessage, res: ServerResponse) {
    try {
      const users = await new UserService().getUsers();
      
      return res.writeHead(StatusCode.OK, StatusMessage.OK, {
        'Content-Type': 'application/json'
      }).end(JSON.stringify(users));

    } catch (error) {
      console.error(error);
    }
  }

  async getUser(id: string,  res: ServerResponse) {
    try {
      if (!validate(id)) throw new UserIdError();
      
      const user = await new UserService().getUser(id);

      if (!user) throw new UserNotFoundError();

      const statusHeader = {
        status: StatusCode.OK,
        message: StatusMessage.OK
      }
      sendResponse(user, res, statusHeader);


    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async createUser( req: IncomingMessage, res: ServerResponse) {
    try {
      const data = await getRequestData(req);
      
      const newUser = await new UserService().createUser(data);
      const statusHeader = {
        status: StatusCode.Created,
        message: StatusMessage.Created
      }
      sendResponse(newUser, res, statusHeader);

    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteUser(id: string, res: ServerResponse) {
    try {
      if (!validate(id)) throw new UserIdError();

      await new UserService().deleteUser(id);

      sendResponse({message: "User deleted"}, res, 
        {status: StatusCode.NoContent, message: StatusMessage.NoContent});
      
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateUser(id: string, req: IncomingMessage, res: ServerResponse) {
    try {
      if (!validate(id)) throw new UserIdError();

      const data = await getRequestData(req);

      const newUser = await new UserService().updateUser(id, data);

      const statusHeader = {
        status: StatusCode.OK,
        message: StatusMessage.OK
      }
      sendResponse(newUser, res, statusHeader);

    } catch (error) {
      handleError(error as Error, res);
    }
  }
}