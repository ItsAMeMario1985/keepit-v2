import express from 'express'
import mongoose from 'mongoose'
//const user = require("./routes/user"); //new addition
import user from './routes/user'
import requestLogger from './middleware/requestLogger'
import cors from 'cors'

mongoose
  .connect('mongodb://localhost:27017/keepitdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error))

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', user)

app.listen(4000, () =>
  console.log('Server is running on http://localhost:4000')
)
