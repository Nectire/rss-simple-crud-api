export enum StatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}

export enum StatusMessage {
  OK = 'OK',
  Created = 'Created',
  NoContent = 'No Content',
  BadRequest = 'Bad Request',
  NotFound = 'Not Found',
  ServerError = 'Server Error'
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}