const { productModel } = require("../models/products.js")

class ProductDAO {
    async create(productData) { return await productModel.create(productData) }

    async getAll(options) {
        const optionAux = options || {}
        const filter = optionAux.filter || {};
        const skip = optionAux.skip;
        const limit = optionAux.limit;
        const sort = optionAux.sort;
        return await productModel.find(filter).skip(skip).limit(limit).sort(sort)
    }

    async count(filter = {}) { return await productModel.countDocuments(filter) }

    async getById(productId) { return await productModel.findById(productId) }

    async update(productId, productData) {
        return await productModel.updateOne({ _id: productId }, { $set: productData })
    }

    async delete(productId) {
        return await productModel.deleteOne({ _id: productId })
    }
}

const productDAO = new ProductDAO()

module.exports = productDAO
