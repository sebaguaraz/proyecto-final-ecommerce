const productDAO = require("../dao/products.js")
const cartDAO = require("../dao/carts.js")
const { sendError } = require("../middlewares/sendError.js")


async function GetProducts(request, response) {

    try {

        const limit = 10
        const page = Number(request.query.page) || 1

        const totalProducts = await productDAO.count()
        const totalPages = Math.ceil(totalProducts / limit)


        const options = {
            filter: {},
            skip: (page - 1) * limit,
            limit: limit,
            sort: { price: 1 }
        }

        const productsMongo = await productDAO.getAll(options)

        const products = productsMongo.map(function (product) { return product.toObject() })

        response.render("products", {

            products: products,
            page: page,
            totalPages: totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1

        })

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }

}

async function GetProductsByID(request, response) {

    const productId = request.params.pid

    if (!productId) {
        sendError(
            response,
            400,
            "ERROR_ESPECIFICACION",
            "El ID del producto es obligatorio y Entero"
        )
        return
    }

    try {


        const productMongo = await productDAO.getById(productId)

        const productObject = productMongo ? productMongo.toObject() : {}

        response.render("productDetail", productObject)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return

    }

}

async function GetCartByID(request, response) {

    const cartId = request.params.cid

    if (!cartId) {
        sendError(
            response,
            400,
            "ERROR_ESPECIFICACION",
            "El ID del carrito es obligatorio y Entero"
        )
        return
    }

    try {

        const cartMongo = await cartDAO.getById(cartId)

        const cart = cartMongo ? cartMongo.toObject() : {}

        response.render("cartDetail", cart)

    } catch (error) {

        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return

    }
}

module.exports = { GetCartByID, GetProducts, GetProductsByID }