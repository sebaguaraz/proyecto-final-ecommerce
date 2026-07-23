const mongoose = require("mongoose")

const productConfig = {

    title: {type: String, required:true},
    description: {type: String, required: true},
    code: {type: Number, unique: true, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, default: true, index: true}, 
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true }, 
    thumbnails: { type: [String], default: [] } 

}

const productSchema = new mongoose.Schema(productConfig)


const productModel = mongoose.model("Product", productSchema)

module.exports = { productModel }