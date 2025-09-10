const errorHandler = (err, req, res, next) => {
    console.log(err.stack); // logs the error for debugging

    // If no status was set earlier, default to 500 (server error)

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
        // stack trace only in dev (not in production for security)
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};


module.exports = errorHandler;