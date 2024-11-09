export class ApiError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super();
  }
}

export class ConflictError extends ApiError {
  constructor(
    public message: string,
    public readonly statusCode: number = 409
  ) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(
    public message: string,
    public readonly statusCode: number = 404
  ) {
    super(message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    public readonly message: string = "You dont have permission to perform this action",
    public readonly statusCode: number = 403
  ) {
    super(message);
  }
}
