// Common response utilities and error handlers

const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const sendError = (res, message = "Error", statusCode = 500, error = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error
    });
};

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    sendSuccess,
    sendError,
    asyncHandler
};
