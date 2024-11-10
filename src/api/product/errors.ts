import { Extensions } from "@prisma/client/runtime/library";
import { ConflictError, NotFoundError } from "../@shared/errors";

export class ProductAlreadUsedError extends ConflictError {
  constructor(public message: string = "Product already registered") {
    super(message);
  }
}

export class ProductNotFound extends NotFoundError {
  constructor(public message: string = "Product not Found") {
    super(message);
  }
}

export class CategoryNotFound extends NotFoundError {
  constructor(public message: string = "category does not exist") {
    super(message);
  }
}

export class ShopingNotFound extends NotFoundError {
  constructor(public message: string = "Shoping does not exist") {
    super(message);
  }
}

export class ManegerNotFound extends NotFoundError {
  constructor(public message: string = "Maneger does not exist") {
    super(message);
  }
}

export class NotEnoughProductsConflict extends ConflictError {
  constructor(public message: string = "Not enough products") {
    super(message);
  }
}

export class RejectedRequestConflict extends ConflictError {
  constructor(public message: string = "This request has been rejected") {
    super(message);
  }
}

export class DuplicatedAprovadRequestConflict extends ConflictError {
  constructor(
    public message: string = "This request has already been approved"
  ) {
    super(message);
  }
}

export class NotAprovadRequestManegerConflict extends ConflictError {
  constructor(public message: string = "This is not the approving manager") {
    super(message);
  }
}
