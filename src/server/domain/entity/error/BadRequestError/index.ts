import CustomError from "..";

export default class BadRequestError extends CustomError {
  public _code = "BAD_REQUEST";
  public _statusCode = 400;
}
