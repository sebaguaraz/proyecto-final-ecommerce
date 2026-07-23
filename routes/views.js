const express = require("express")

const { GetCartByID, GetProducts, GetProductsByID } = require("../controllers/views.js")

const router = express.Router()

router.get("/products", GetProducts)

router.get("/products/:pid", GetProductsByID)

router.get("/carts/:cid", GetCartByID)

module.exports = router