const express = require('express') 
const router = express.Router()
const {userVerification} = require('../Middlewares/AuthMiddleware')
const {Login, Register} = require('../controllers/authController')

//login route
router.post('/login', Login)

//signup route
router.post('/signup',Register)

router.post('/',userVerification)

module.exports = router