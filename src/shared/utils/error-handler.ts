import { ERRORS } from "config";
import { GraphQLError } from "graphql";

export type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export class HttpError extends GraphQLError {
  constructor(private status: HttpStatus = 500, public message: string, private code = ERRORS.UNKNOWN_ERROR) {
    super(message);

    this.extensions.code = this.code;
    this.extensions.http = { status: this.status };
  }
}
