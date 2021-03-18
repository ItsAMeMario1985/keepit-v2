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
var replacedPrivateKey = process.env.g_private_key
replacedPrivateKey.replace(/\\n/g, '\n')

var testenv = {
  type: process.env.g_type,
  project_id: process.env.g_project_id,
  private_key_id: process.env.g_private_key_id,
  private_key: replacedPrivateKey,
  client_email: process.env.g_client_email,
  client_id: process.env.g_client_id,
  auth_uri: process.env.g_auth_uri,
  token_uri: process.env.g_token_uri,
  auth_provider_x509_cert_url: process.env.g_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.g_client_x509_cert_url,
}

console.log(testenv)

app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json({ limit: '200mb' }))
//app.use(requestLogger())
const path = require('path')

//app.use('/', express.static(path.join(__dirname, '../client/build')))
app.use('/api/media', express.static('src/public'))
app.use('/api/user', userRoute)
app.use('/api/keepit', keepitRoute)
app.use('/api/image', imageRoute)

app.use(express.static(path.join(__dirname, '../client/build')))
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Server (keepit-v2) is running on http://localhost:4000')
  //deleteUnusedImg()
})
