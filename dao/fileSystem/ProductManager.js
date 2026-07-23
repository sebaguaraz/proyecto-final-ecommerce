const fs = require("fs/promises")
const path = require("path")

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, "../../data/products.json")
    }
    async getProducts() {
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }
    async addProduct(product) {
        const products = await this.getProducts()
        const newProduct = { id: products.length > 0 ? products[products.length - 1].id + 1 : 1, ...product }
        products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        return newProduct
    }

    async getProductById(id) {
        const products = await this.getProducts()
        return products.find(product => product.id === Number(id))
    }

    async updateProduct(id, data) {
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === Number(id))
        if (index === -1) return null
        products[index] = { ...products[index], ...data, id: products[index].id }
        await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        return products[index]
    }

    async deleteProduct(id) {
        const products = await this.getProducts()
        const newProducts = products.filter(product => product.id !== Number(id))
        await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2))
        return newProducts
    }
}

module.exports = ProductManager