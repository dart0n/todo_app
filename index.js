require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: process.env.HEROKU_APP_URL,
  optionsSuccessStatus: 200,
}

app.use(express.json({ extended: true }))
app.use(cors(process.env.NODE_ENV === 'production' ? corsOptions : { origin: true }))
app.options('*', cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/projects', require('./routes/projects.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

async function start() {
  // start server after connecting to db
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
