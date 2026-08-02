const { sendError } = require("../middlewares/sendError.js")
const { createcart, getcartByID, addProductIncart, deleteProductFromcart, updateAllProductsIncart, updateProductAmountIncart, clearcart } = require("../services/carts.js")

async function createCart(request, response) {

    try {
        const result = await createcart()
        return response.status(201).json(result)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function getCartByID(request, response) {

    const cartId = request.params.cid
    if (!cartId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del carrito es necesario")
        return
    }

    try {

        const cartExists = await getcartByID(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }

        return response.status(200).json(cartExists)

    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function clearCart(request, response) {
    const cartId = request.params.cid

    try {

        if (!cartId) {
            sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del carrito es necesario")
            return
        }

        const cartExists = await clearcart(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }

        return response.status(200).json(cartExists)

    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function addProductInCart(request, response) {

    const cartId = request.params.cid
    const productId = request.params.pid

    if (!cartId || !productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del carrito y del producto son obligatorios")
        return
    }

    try {

        const cartExists = await addProductIncart(cartId, productId)

        if (!cartExists) {
            sendError(response, 404, "ERROR_ESPECIFICACION", "No se encontró el carrito o el producto")
            return
        }

        return response.status(200).json(cartExists)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function updateProductAmountInCart(request, response) {

    const cartId = request.params.cid
    const productId = request.params.pid
    const amount = Number(request.body.amount)

    if (!cartId || !productId || !amount) {
        return sendError(response, 400, "ERROR_ESPECIFICACION", "Los IDs y la cantidad son obligatorios")
    }

    if (amount <= 0 || isNaN(amount) || !Number.isInteger(amount)) {
        return sendError(response, 400, "ERROR_ESPECIFICACION", "La cantidad debe ser un número entero mayor a 0")
    }

    try {

        const cartExists = await updateProductAmountIncart(cartId, productId, amount)

        if (!cartExists) {
            sendError(response, 404, "ERROR_ESPECIFICACION", "No se encontró el carrito o el producto")
            return
        }

        return response.status(200).json(cartExists)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function updateAllProductsInCart(request, response) {

    const cartId = request.params.cid
    const listNewProducts = request.body.products

    if (!listNewProducts || !(listNewProducts instanceof Array)) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "La nueva lista de productos es necesaria")
        return
    }

    try {

        const cartExists = await updateAllProductsIncart(cartId, listNewProducts)

        if (!cartExists) {
            sendError(response, 404, "ERROR_ESPECIFICACION", "No se encontró el carrito")
            return
        }

        return response.status(200).json(cartExists)

    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function deleteProductFromCart(request, response) {

    const cartId = request.params.cid
    const productId = request.params.pid

    if (!cartId || !productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "Los IDs son obligatorios")
        return
    }

    try {

        const cartExists = await deleteProductFromcart(cartId, productId)

        if (!cartExists) {
            sendError(response, 404, "ERROR_ESPECIFICACION", "No se encontró el carrito o el producto")
            return
        }

        return response.status(200).json({ message: `Producto con ID ${productId} eliminado correctamente`, cartExists: cartExists })

    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

module.exports = { createCart, getCartByID, addProductInCart, deleteProductFromCart, updateAllProductsInCart, updateProductAmountInCart, clearCart }