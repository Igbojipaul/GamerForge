const express = require("express")
const { fetchFilteredProduct, fetchProductDetails } = require("../../controllers/shopRoutes/productsController")

const router = express.Router()


router.get('/fetch', fetchFilteredProduct)
router.get('/fetch/:id', fetchProductDetails)

module.exports = router
