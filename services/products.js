const productDAO = require("../dao/products.js")

async function createproduct(newProduct) {
    try {
        const result = await productDAO.create(newProduct)
        return result

    } catch (error) {
        throw error
    }
}

async function getproductbyId(productId) {
    try {
        const productExists = await productDAO.getById(productId)

        if (!productExists) {
            return null
        }
        return productExists

    } catch (error) {
        throw error
    }
}

async function updateproduct(productId, object) {

    try {
        const productExists = await productDAO.update(productId, object)
        if (productExists.matchedCount === 0) {
            return null
        }
        return productExists

    } catch (error) {
        throw error
    }
}

async function deleteproduct(productId) {

    try {
        const productExists = await productDAO.delete(productId)
        if (productExists.deletedCount === 0) {
            return null
        }
        return productExists

    } catch (error) {
        throw error
    }
}

async function listproducts(queryParams, page, limitProducts, sort, filter, request) {

    try {

        const totalProducts = await productDAO.count(filter)
        const totalPages = Math.ceil(totalProducts / limitProducts)
        const hasPrevPage = page > 1
        const hasNextPage = page < totalPages
        const prevPage = hasPrevPage ? page - 1 : null
        const nextPage = hasNextPage ? page + 1 : null
        const baseUrl = `${request.protocol}://${request.get("host")}/api/products`
        const queryText = queryParams ? `&query=${queryParams}` : ""
        const prevLink = hasPrevPage ? `${baseUrl}?page=${prevPage}&limit=${limitProducts}&sort=${sort}${queryText}` : null
        const nextLink = hasNextPage ? `${baseUrl}?page=${nextPage}&limit=${limitProducts}&sort=${sort}${queryText}` : null

        const options = { filter: filter, skip: (page - 1) * limitProducts, limit: limitProducts, sort: { price: sort === "asc" ? 1 : -1 } }

        const listProductsExists = await productDAO.getAll(options)

        if (listProductsExists.length === 0) {

            return { status: "success", payload: [], totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink }

        }

        return { status: "success", payload: listProductsExists, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink }

    } catch (error) {
        throw error
    }
}


module.exports = { createproduct, getproductbyId, updateproduct, deleteproduct, listproducts }