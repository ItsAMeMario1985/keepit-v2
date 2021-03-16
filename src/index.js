import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/user-route'
import imageRoute from './routes/image-route'
import keepitRoute from './routes/keepit-route'
import requestLogger from './middleware/requestLogger'
require('dotenv').config()
import deleteUnusedImg from './jobs/deleteUnusedImg'

mongoose
  .connect(process.env.mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error))

const app = express()

app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json({ limit: '200mb' }))
app.use(requestLogger())
const path = require('path')

app.use('/', express.static(path.join(__dirname, '../client/build')))
app.use('/api/media', express.static('src/public'))
app.use('/api/user', userRoute)
app.use('/api/keepit', keepitRoute)
app.use('/api/image', imageRoute)

app.listen(5000, () => {
  console.log('Server (keepit-v2) is running on http://localhost:4000')
  deleteUnusedImg()
})
