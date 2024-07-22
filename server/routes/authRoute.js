const express = require('express') 
const router = express.Router()

const {Login, Register} = require('../controllers/authController')

//login route
router.post('/login', Login)

//signup route
router.post('/signup',Register)


module.exports = router