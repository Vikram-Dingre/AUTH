import ApiError from "./ApiError.js";
import ApiRes from "./ApiResponse.js";

const globalErrorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    return res
      .status(500)
      .json(
        new ApiRes(500,null, err.message ?? err._message ?? "Internal Server Error"),
      );
  }
 return res
    .status(err.statusCode)
    .json(new ApiRes(err.statusCode, null, err.message));
};


export default globalErrorHandler;