const { sendError } = require("../middlewares/sendError.js")

const { GetcartByID, Getproducts, GetproductsByID } = require("../services/views.js")

async function GetProducts(request, response) {

    try {

        const limit = 10
        const page = Number(request.query.page) || 1

        const products = await Getproducts(limit, page)

        response.render("products", products)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }

}

async function GetProductsByID(request, response) {

    const productId = request.params.pid

    if (!productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del producto es obligatorio y Entero")
        return
    }

    try {

        const productObject = await GetproductsByID(productId)

        response.render("productDetail", productObject)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return

    }

}

async function GetCartByID(request, response) {

    const cartId = request.params.cid

    if (!cartId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del carrito es obligatorio y Entero")
        return
    }

    try {

        const cart = await GetcartByID(cartId)

        response.render("cartDetail", cart)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return

    }
}

module.exports = { GetCartByID, GetProducts, GetProductsByID }