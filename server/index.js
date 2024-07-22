
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')

//Express app
const app = express();


//Middleware 
app.use(cors());
app.use(express.json());


//Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(()=> {
    console.log(`MongoDB Connected: on port ${port}`.cyan.underline);
})
.catch((error) => {
    console.log(error)
})


// start the Express server
app.listen(port, () => console.log(`Server started on port ${port}`))


//Routes
//app.get('/', (req, res)=> res.status(200).json({message:"test"}))
app.use('/', require('./routes/authRoute.js'))
