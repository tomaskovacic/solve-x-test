const asyncHandler = require('express-async-handler')

const Meme = require('../models/memeModel')
const User = require('../models/userModel')

// @route   GET /api/memes
const getMemes = asyncHandler( async (req, res) => {
    const meme = await Meme.find()
    res.status(200).json(meme)
})

// @route   GET /api/memes/:id
const getMemesUser = asyncHandler( async (req, res) => {
    const meme = await Meme.find({user: req.user.id })
    res.status(200).json(meme)
})

// @route   POST /api/meme
const postMeme = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('error!')
    }

    const meme = await Meme.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(meme)
})

// @route   PUT /api/meme/:id
const updateMeme = asyncHandler( async (req, res) => {
    const meme = await Meme.findById(req.params.id)

    if(!meme){
        res.status(400)
        throw new Error('Meme not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    if(meme.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    const updatedMeme = await Meme.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedMeme)
})

// @route   DELETE /api/meme/:id
const deleteMeme = asyncHandler( async (req, res) => {

    const meme = await Meme.findById(req.params.id)

    if(!meme){
        res.status(400)
        throw new Error('Meme not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    if(meme.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    await meme.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMemes,
    postMeme,
    updateMeme,
    deleteMeme
}