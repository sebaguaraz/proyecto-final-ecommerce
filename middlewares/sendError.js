function sendError(response, statusCode, exception, detail) {

    response.status(statusCode)
    response.json({ exception: exception, detail: detail })

}



module.exports = { sendError }