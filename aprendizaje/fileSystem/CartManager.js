const fs = require("fs/promises")
const path = require("path")

class CartManager {
    constructor() {
        this.path = path.join(__dirname, "carts.json")
    }
    async getCarts() {
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }
    async addCart() {
        const carts = await this.getCarts()
        const newCart = { id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, products: [] }
        carts.push(newCart)
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        return newCart
    }

    async getCartById(id) {
        const carts = await this.getCarts()
        return carts.find(cart => cart.id === Number(id))
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id === Number(cartId))
        if (!cart) return null
        const product = cart.products.find(product => product.product === Number(productId))
        if (product) {
            product.quantity += 1
        } else {
            cart.products.push({ product: Number(productId), quantity: 1 })
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        return cart
    }
}

module.exports = CartManager


