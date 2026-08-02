const productDAO = require("../dao/products.js")
const cartDAO = require("../dao/carts.js")

async function Getproducts(limit, page) {

    try {

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
        
        
        const productsExist = {

            products: products,
            page: page,
            totalPages: totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1

        }

        return productsExist

    } catch (error) {
        throw error
    }

}

async function GetproductsByID(productId) {

    try {

        const productMongo = await productDAO.getById(productId)

        const productObject = productMongo ? productMongo.toObject() : {}

        return productObject

    } catch (error) {
        throw error
    }

}

async function GetcartByID(cartId) {

    try {

        const cartMongo = await cartDAO.getById(cartId)

        const cart = cartMongo ? cartMongo.toObject() : {}

        return cart

    } catch (error) {
        throw error
    }
}

module.exports = { GetcartByID, Getproducts, GetproductsByID }