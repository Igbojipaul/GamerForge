const express = require("express")

const router = express.Router()

const {addToCart, getCartItems, updateCartItem, deleteCartItem} = require("../../controllers/shopRoutes/cartContoller")

const {authenticate} = require('../../controllers/authentication/userController')


router.get('/get', authenticate, getCartItems)
router.post('/add', authenticate, addToCart)
router.put('/update', authenticate, updateCartItem)
router.delete('/delete/:productId', authenticate, deleteCartItem)

module.exports = router