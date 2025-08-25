const authMiddleware = require('./auth');
const { upload, handleMulterError } = require('./upload');
const { errorHandler, notFound } = require('./errorHandler');

module.exports = {
    authMiddleware,
    upload,
    handleMulterError,
    errorHandler,
    notFound
};
