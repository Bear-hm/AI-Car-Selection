const express = require('express')
const cors = require('cors')
const recommendRouter = require('./routes/recommend')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', recommendRouter)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error'
  })
})

module.exports = app
