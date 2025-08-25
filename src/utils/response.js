const sendResponse = (res, statusCode, success, message, data = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message, statusCode = 400) => {
    return sendResponse(res, statusCode, false, message);
};

const sendCreated = (res, message, data = null) => {
    return sendResponse(res, 201, true, message, data);
};

module.exports = {
    sendResponse,
    sendSuccess,
    sendError,
    sendCreated
};
