const cartDAO = require("../dao/carts.js")
const productDAO = require("../dao/products.js")

async function createcart(request, response) {
    try {
        const result = await cartDAO.create()
        return result

    } catch (error) {
        throw error
    }
}
async function getcartByID(cartId) {

    try {

        const cartExists = await cartDAO.getById(cartId)
        if (!cartExists) {
            return null
        }
        return cartExists

    } catch (error) {
        throw error
    }
}

async function clearcart(cartId) {

    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            return null
        }
        cartExists.products = []
        await cartDAO.save(cartExists)

        return cartExists

    } catch (error) {
        throw error
    }
}

async function addProductIncart(cartId, productId) {

    try {

        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            return null
        }

        const productExists = await productDAO.getById(productId)
        if (!productExists) {
            return null
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
        return cartExists

    } catch (error) {
        throw error
    }
}


async function updateProductAmountIncart(cartId, productId, amount) {

    try {
        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            return null
        }

        const productFind = cartExists.products.find(function (object) {
            return String(object.author) === productId
        })
        if (!productFind) {
            return null
        }

        productFind.amount = amount
        await cartDAO.save(cartExists)

        return cartExists

    } catch (error) {
        throw error
    }
}

async function updateAllProductsIncart(cartId, listNewProducts) {

    try {

        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)

        if (!cartExists) {
            return null
        }

        cartExists.products = listNewProducts
        await cartDAO.save(cartExists)

        return cartExists

    } catch (error) {
        throw error
    }
}

async function deleteProductFromcart(cartId, productId) {

    try {

        const cartExists = await cartDAO.getByIdWithoutPopulate(cartId)
        if (!cartExists) {
            return null
        }

        const amountBefore = cartExists.products.length
        const listProductsExists = cartExists.products.filter(function (object) {
            return String(object.author) !== productId
        })

        if (listProductsExists.length === amountBefore) {
            return null
        }

        cartExists.products = listProductsExists
        await cartDAO.save(cartExists)

        return cartExists

    } catch (error) {
        throw error
    }
}

module.exports = { createcart, getcartByID, addProductIncart, deleteProductFromcart, updateAllProductsIncart, updateProductAmountIncart, clearcart }