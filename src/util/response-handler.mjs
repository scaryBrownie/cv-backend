export const sendResponse = (
    res,
    statusCode,
    success,
    message,
    data = null
  ) => {
    const response = {
      success,
      message,
      ...(data && { data }),
    };
  
    return res.status(statusCode).json(response);
  };
  
  export const sendErrorResponse = (
    res,
    statusCode = 500,
    message = "Server error"
  ) => {
    return sendResponse(res, statusCode, false, message);
  };
  
  export const sendSuccessResponse = (
    res,
    statusCode = 200,
    message = "Operation successful",
    data = null
  ) => {
    return sendResponse(res, statusCode, true, message, data);
  };