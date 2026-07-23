const express = require("express")

const { createCart, getCartByID, addProductInCart, deleteProductFromCart, updateAllProductsInCart, updateProductAmountInCart, clearCart } = require("../controllers/carts.js")

const router = express.Router()

router.post("/", createCart)

router.get("/:cid", getCartByID)

router.post("/:cid/products/:pid", addProductInCart)

router.delete("/:cid/products/:pid", deleteProductFromCart)

router.put("/:cid", updateAllProductsInCart)

router.put("/:cid/products/:pid", updateProductAmountInCart)

router.delete("/:cid", clearCart)


module.exports = router


