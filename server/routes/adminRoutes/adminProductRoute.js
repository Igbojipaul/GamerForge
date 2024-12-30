const express = require("express")

const router = express.Router()

const {upload} = require('../../helper/cloudinary')
const {uploadImage, addProduct, fetchProduct, updateProduct, deleteProduct} = require('../../controllers/admin/productController')

router.post('/upload', upload.single("file"), uploadImage)
router.post('/add', addProduct)
router.get('/fetch', fetchProduct)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)


module.exports = router
