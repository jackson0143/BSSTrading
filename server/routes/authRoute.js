const express = require('express') 
const router = express.Router()

const {Login, Register} = require('../controllers/authController')
const {DiscordAuth, LoggedIn} = require('../controllers/authDiscordController')
//login route
router.get('/discord/redirect', DiscordAuth)

router.get('/logged_in',LoggedIn )
router.post('/login', Login)

//signup route
router.post('/signup',Register)

router.get('/url', (_, res) => {
    res.json({
      url: `${config.authUrl}?${authParams}`,
    })
  })


module.exports = router