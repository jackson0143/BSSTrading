const express = require('express') 
const router = express.Router()

const {Login, Register} = require('../controllers/authController')
const {DiscordAuth} = require('../controllers/authDiscordController')
//login route
router.get('/discord/redirect', DiscordAuth)
router.post('/login', Login)

//signup route
router.post('/signup',Register)


module.exports = router