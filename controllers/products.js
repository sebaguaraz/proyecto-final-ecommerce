const productDAO = require("../dao/products.js")
const { sendError } = require("../middlewares/sendError.js")

async function CreateProduct(request, response) {
    try {
        const io = request.app.get("io")
        const { title, description, code, price, status, stock, category, thumbnails } = request.body

        const newProduct = { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails }
        const result = await productDAO.create(newProduct)
        io.emit("productsUpdated")
        return response.status(201).json(result)
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function GetProductById(request, response) {
    const productId = request.params.pid
    if (!productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del producto es necesario")
        return
    }
    try {
        const productExists = await productDAO.getById(productId)
        if (!productExists) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId}`)
            return
        }
        return response.status(200).json(productExists)
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}












async function UpdateProduct(request, response) {

    const productId = request.params.pid
    const io = request.app.get("io")
    if (!productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del producto es necesario")
        return
    }
    const { title, description, code, price, status, stock, category, thumbnails } = request.body

    try {
        const productExists = await productDAO.update(
            productId,
            { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails })
        if (productExists.matchedCount === 0) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId}`)
            return
        }
        io.emit("productsUpdated")
        return response.status(200).json({ message: `Producto con ID ${productId} actualizado exitosamente` })
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}

async function DeleteProduct(request, response) {
    const productId = request.params.pid
    const io = request.app.get("io")
    if (!productId) {
        sendError(response, 400, "ERROR_ESPECIFICACION", "El ID del producto es necesario")
        return
    }
    try {
        const productExists = await productDAO.delete(productId)
        if (productExists.deletedCount === 0) {
            sendError(response, 404, "ERROR_DOMINIO", `No se encontró el producto con ID: ${productId}`)
            return
        }
        io.emit("productsUpdated")
        return response.status(200).json({ message: `Producto con ID ${productId} eliminado correctamente` })
    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}










async function ListProducts(request, response) {
    try {
        const queryParams = request.query.query || null
        const page = Number(request.query.page) || 1
        const limitProducts = Number(request.query.limit) || 10
        const sort = request.query.sort || "asc"
        if (sort !== "asc" && sort !== "desc") {
            sendError(response, 422, "ERROR_DOMINIO", "El valor de 'sort' debe ser 'asc' o 'desc'")
            return
        }
        const filter = {}
        if (queryParams) {
            if (queryParams === "true" || queryParams === "false") {
                const boolean = queryParams === "true"
                filter.status = boolean
            } else {
                filter.category = queryParams
            }
        }
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

        return response.status(200).json({ status: "success", payload: listProductsExists, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink })

    } catch (error) {
        sendError(response, 500, "ERROR_INTERNO_SERVIDOR", error.message)
        return
    }
}


module.exports = { ListProducts, GetProductById, CreateProduct, DeleteProduct, UpdateProduct }