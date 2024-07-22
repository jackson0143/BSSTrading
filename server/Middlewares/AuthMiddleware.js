const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async(req, res, next) => {
  const {authorization} = req.headers
console.log(authorization)
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
  const token = authorization.split(' ')[1]
  console.log(token)
  try {
    const _id= jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  }
  catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }

  }

module.exports = {userVerification}