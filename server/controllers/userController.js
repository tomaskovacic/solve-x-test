const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @route   POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, lastname, email, password } = req.body

    if (!name || !lastname || !email || !password) {
        res.status(400)
        throw new Error('Please fill out all fields!')
    }

    // Check if user exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists!')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials!')
    }
})

// @route   GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, lastname, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        lastname,
        email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1h'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}