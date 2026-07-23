const express = require('express')
const { ListProducts, GetProductById, CreateProduct, DeleteProduct, UpdateProduct } = require("../controllers/products.js")

const {validateFields} = require("../middlewares/validateFieldsProducts.js")

const router = express.Router()

router.get("/", ListProducts)
router.get("/:pid", GetProductById)
router.post("/", validateFields, CreateProduct)
router.delete("/:pid", DeleteProduct)
router.put("/:pid", UpdateProduct)

module.exports = router