const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  
const token = req.cookies.token
  if (!token) {
    return res.status(401).json({error: 'Authorization token required'})
  }  

  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth