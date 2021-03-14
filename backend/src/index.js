import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/user'
import imageRoute from './routes/image'
import keepitRoute from './routes/keepit'
import requestLogger from './middleware/requestLogger'
import auth from './middleware/auth'

import cors from 'cors'
require('dotenv').config()

mongoose
  .connect('mongodb://localhost:27017/keepitdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error))

const app = express()

app.use(cors())
app.use(express.json({ limit: '200mb' }))
//app.use(requestLogger())
app.use(express.static('src/public'))
app.use('/user', userRoute)
//app.use(auth)
app.use('/keepit', keepitRoute)
app.use('/image', imageRoute)
app.listen(4000, () =>
  console.log('Server is running on http://localhost:4000')
)
