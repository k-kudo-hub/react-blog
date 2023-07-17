import CustomError from "..";

export default class InternalServerError extends CustomError {
  public _code = "INTERNAL_SERVER_ERROR";
  public _statusCode = 500;
}
