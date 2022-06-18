
export class UserIdError extends Error {
  constructor(msg: string = 'Invalid user id! Should be uuid') {
    super(msg);
  }
}

export class UserNotFoundError extends Error {
  constructor(msg: string = `User doesn't exists!`) {
    super(msg);
  }
}

export class RequiredFieldsError extends Error {
  constructor(msg: string = `Body should have required fields!`) {
    super(msg);
  }
}

export class PageNotFoundError extends Error {
  constructor(msg: string = `The server cannot find the requested resource.`) {
    super(msg);
  }
}
