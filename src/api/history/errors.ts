import { NotFoundError } from "../@shared/errors";

export class HistoryNotFound extends NotFoundError {
  constructor(public readonly message: string = "History not Found") {
    super(message);
  }
}
