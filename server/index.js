
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute')


const config = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 36000,
  postUrl: 'https://jsonplaceholder.typicode.com/posts',
}
//Express app
const app = express();


//Middleware 
app.use(cors())
app.use(express.json());
app.use(cookieParser());


//Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(()=> {
    console.log(`MongoDB Connected: on port ${port}`.cyan.underline);
})
.catch((error) => {
    console.log(error)
})



//Routes
//app.get('/', (req, res)=> res.status(200).json({message:"test"}))

app.use('/',require ('./routes/authRoute.js') )


// start the Express server
app.listen(port, () => console.log(`Server started on port ${port}`))


