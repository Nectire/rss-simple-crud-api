import { ServerResponse } from 'http';

import { StatusCode, StatusMessage } from "../enums";
import { RequiredFieldsError, UserIdError, UserNotFoundError } from "../errors";

export function handleError(error: Error, res: ServerResponse) {
  if (error instanceof UserIdError) {
    console.error(error.message);
    res
      .writeHead(StatusCode.BadRequest, StatusMessage.BadRequest, {
        'Content-Type': 'text/plain'
      })
      .end(error.message);
    return;
  }

  if (error instanceof UserNotFoundError) {
    console.error(error.message);
    res
      .writeHead(StatusCode.NotFound, StatusMessage.NotFound, {
        'Content-Type': 'text/plain'
      })
      .end(error.message);
    return;
  }

  if (error instanceof RequiredFieldsError) {
    console.error(error.message);
    res
      .writeHead(StatusCode.BadRequest, StatusMessage.BadRequest, {
        'Content-Type': 'text/plain'
      })
      .end(error.message);
    return;
  }
  console.error(error);
}