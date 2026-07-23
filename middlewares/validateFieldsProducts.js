const { sendError } = require("./sendError.js")


function validateFields(request, response, next) {

    const { title, description, code, price, stock, category, thumbnails } = request.body

    if (!title || !description || !category) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "Faltan campos obligatorios (titulo, descripcion, categoria)")
        return
    }

    if (!code || !price || isNaN(price) || isNaN(code)) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "Campos incompletos/ Precio y codigo deben ser Enteros")
        return
    }

    if (!stock || stock <= 0 || isNaN(stock)) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "Campos incompletos. Stock >= 0 y Entero ")
        return
    }


    next()


}


module.exports = { validateFields }