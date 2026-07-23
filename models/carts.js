const mongoose = require("mongoose")

const cartConfig = {

    products: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: { type: Number, default: 1 }
        }
    ]
}

const cartSchema = new mongoose.Schema(cartConfig)

const cartModel = mongoose.model("Cart", cartSchema)

module.exports = { cartModel }