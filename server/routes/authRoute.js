const express = require('express') 
const router = express.Router()

const {Login, Register} = require('../controllers/authController')
const {DiscordAuth, LoggedIn, Logout} = require('../controllers/authDiscordController')
//login route
router.get('/discord/redirect', DiscordAuth)

router.get('/loggedin',LoggedIn )

router.get('/logout', Logout)

//signup route
/*
router.post('/signup',Register)
router.post('/login', Login)
*/
router.get('/url', (_, res) => {
    res.json({
      url: `${config.authUrl}?${authParams}`,
    })
  })


module.exports = router