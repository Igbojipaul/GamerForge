const express = require("express")

const router = express.Router()

const {saveItem, getSavedItems, deleteSavedItem} = require("../../controllers/shopRoutes/savedItemsController")

// changed something here

const {authenticate} = require('../../controllers/authentication/userController')


router.get('/get', authenticate, getSavedItems)
router.post('/add', authenticate, saveItem)
router.delete('/delete/:productId', authenticate, deleteSavedItem)

module.exports = router