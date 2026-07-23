const cartDAO = require("../dao/carts.js")
const productDAO = require("../dao/products.js")
const { sendError } = require("../middlewares/sendError.js")

async function createCart(request, response) {
    try {
        const result = await cartDAO.create()
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
        const cartExists = await cartDAO.getById(cartId)
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
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }
        cartExists.products = []
        await cartDAO.save(cartExists)
        return response.status(200).json(cartExists)
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}















async function addProductInCart(request, response) {
    const cartId = request.params.cid
    const productId = request.params.pid
    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }
        const productExists = await productDAO.getById(productId)
        if (!productExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId}`)
            return
        }
        const productIntoCart = cartExists.products.find(function (object) {
            return String(object.author) === productId
        })
        if (productIntoCart) {
            productIntoCart.amount += 1
        } else {
            cartExists.products.push({ author: productId, amount: 1 })
        }
        await cartDAO.save(cartExists)
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
    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }
        const productFind = cartExists.products.find(function (object) {
            return String(object.author) === productId
        })
        if (!productFind) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId}`)
            return
        }
        productFind.amount = amount
        await cartDAO.save(cartExists)
        return response.status(200).json(cartExists)
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}
async function updateAllProductsInCart(request, response) {
    const cartId = request.params.cid
    const listNewProducts = request.body.products
    if (!listNewProducts) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "La nueva lista de productos es necesaria")
        return
    }
    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }
        cartExists.products = listNewProducts
        await cartDAO.save(cartExists)
        return response.status(200).json(cartExists)
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}













async function deleteProductFromCart(request, response) {
    const cartId = request.params.cid
    const productId = request.params.pid
    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el carrito con ID: ${cartId}`)
            return
        }
        const amountBefore = cartExists.products.length
        const listProductsExists = cartExists.products.filter(function (object) {
            return String(object.author) !== productId
        })
        if (listProductsExists.length === amountBefore) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId} en el carrito`)
            return
        }
        cartExists.products = listProductsExists
        await cartDAO.save(cartExists)
        return response.status(200).json({ message: `Producto con ID ${productId} eliminado correctamente`, cartExists })
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

module.exports = { createCart, getCartByID, addProductInCart, deleteProductFromCart, updateAllProductsInCart, updateProductAmountInCart, clearCart }