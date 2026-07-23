const { cartModel } = require("../models/carts.js")

class CartDAO {

    async create() { return await cartModel.create({}) }

    async getById(cartId) { return await cartModel.findById(cartId).populate("products.author") }

    async getByIdWithoutPopulate(cartId) { return await cartModel.findById(cartId) }

    async save(cart) { return await cart.save() }
}

const cartDAO = new CartDAO()


module.exports = cartDAO
