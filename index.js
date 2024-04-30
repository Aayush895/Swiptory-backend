const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const registerRouter = require('./routes/register')
const storyRouter = require('./routes/story')

app.use(cors())
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 4000

app.get('/api/route-health', (req, res) => {
  res.send({
    message: 'Server is running fine',
  })
})

app.use('/api/register', registerRouter)
app.use('/api/story', storyRouter)

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Server & Database are up and running')
})
