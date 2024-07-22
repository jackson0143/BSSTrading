const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//creates a token to safely transfer information, for authentication
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {});
};

//Register user
const Register = async (req, res) => {
    const { email, password, username, createdAt } = req.body;
    try {
        //Checks if email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        let existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ msg: 'Username already in use' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(password, salt)

        //creates a new user with the model
        const user = await User.create({ email, password: hashed_password, username, createdAt });
        const token = createToken(user._id)



        res.status(200).json({ email, username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }



};


//Register user
const Login = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        //Checks if email already exists
        if (!(email || username) || !password) {
            return res.json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: 'Email or Username does not exist' });
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }

        const token = createToken(user._id)
       

        res.status(200).json({ email: user.email, username: user.username, token });
    }


    catch (error) {
        res.status(400).json({ error: error.message });
    }


};


module.exports = {
    Login,
    Register,
};