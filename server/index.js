const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const app = express()

mongoose
  .connect(process.env.MONGO_URI, {})
  .catch(console.error)
  .then(() => console.log('Connected to MongoDB'))

const User = mongoose.model('User', new mongoose.Schema({}))

const changeStream = User.watch()

const USERS_INDEX = 'users_index_yt'

const addToIndex = async data => {
  try {
  } catch (error) {
    console.log(error)
  }
}

const updateIndex = async (id, data) => {
  try {
  } catch (error) {
    console.log(error)
  }
}

const deleteFromIndex = async id => {
  try {
  } catch (error) {
    console.log(error)
  }
}

changeStream.on('change', async data => {
  console.log(data)
})

app.listen(8000, () => {
  console.log('Server running on port 8000')
})
