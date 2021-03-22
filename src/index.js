import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/user-route'
import imageRoute from './routes/image-route'
import keepitRoute from './routes/keepit-route'
import requestLogger from './middleware/requestLogger'
import errorHandler from './middleware/errorHandler'

require('dotenv').config()

mongoose
  .connect(process.env.mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error))

const app = express()
const path = require('path')

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use('/api/media', express.static('src/public'))
app.use('/api/user', userRoute)
app.use('/api/keepit', keepitRoute)
app.use('/api/image', imageRoute)
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})
app.use(errorHandler())
app.listen(process.env.PORT || 5000, () => {
  console.log(
    'Server (keepit-v2) is running on http://localhost:' + process.env.PORT
  )
})
