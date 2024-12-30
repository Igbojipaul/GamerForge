const express = require("express")

const router = express.Router()

const {signup, login, authenticate, logout} = require("../../controllers/authentication/userController")



router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/keepUser', authenticate, (req, res)=>{
      
      res.status(200).json({success: true, message: "Access granted", user: req.user})
})

module.exports = router
