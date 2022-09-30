const express = require('express')
const colors = require('colors')
var cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/memes', require('./routes/Memes'))
app.use('/api/users', require('./routes/User'))


app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})