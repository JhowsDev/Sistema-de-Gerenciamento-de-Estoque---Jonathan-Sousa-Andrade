import { ConflictError, NotFoundError } from "../@shared/errors";

export class CategoryAlreadUsedError extends ConflictError {
  constructor(public message: string = "Category already exists") {
    super(message);
  }
}

export class CategoryNotFound extends NotFoundError {
  constructor(public message: string = "Category not Found") {
    super(message);
  }
}
