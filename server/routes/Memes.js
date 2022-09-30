const express = require('express')
const router = express.Router()
const { getMemes } = require("../controllers/memesController")
const { postMeme } = require("../controllers/memesController")
const { updateMeme } = require("../controllers/memesController")
const { deleteMeme } = require("../controllers/memesController")

const {protect} = require('../middleware/authMiddleware')


router.route('/').get(getMemes).post(protect, postMeme)
router.route('/:id').put(protect, updateMeme).delete(protect, deleteMeme)


module.exports = router