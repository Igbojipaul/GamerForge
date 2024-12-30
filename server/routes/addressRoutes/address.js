const {fetchAdresses, addAddress, deleteAddress, updateAddress} = require("../../controllers/address/address-controller")


const express = require("express")
const { authenticate } = require("../../controllers/authentication/userController")
const router = express.Router()


router.get('/get-addresses', authenticate, fetchAdresses)
router.put('/update-address/:id',  authenticate, updateAddress)
router.post('/add-address', authenticate, addAddress)
router.delete('/delete-address/:id', authenticate, deleteAddress)

module.exports = router