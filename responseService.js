module.exports = {
  successResponse(res, data, message = "") {
    return res.json({
      success: true,
      message: message,
      errors: [],
      data: data,
    });
  },
  errorResponse(res, errors, status = 401) {
    if (typeof errors === "string") {
      return res.status(status).json({
        success: false,
        message: errors.message,
        errors: errors,
        data: null,
      });
    } else if (Array.isArray(errors)) {
      return res.status(status).json({
        success: false,
        message: errors.map((err) => Object.values(err)).join("<br />"),
        errors: errors,
        data: null,
      });
    } else if (typeof errors === "object") {
      return res.status(status).json({
        success: false,
        message: errors.message ? errors.message : "Cannot Perform Operation!",
        errors: errors,
        data: null,
      });
    } else {
      return res.status(status).json({
        success: false,
        message: "Cannot Perform Operation!",
        errors: "server error",
        data: null,
      });
    }
  },
};
