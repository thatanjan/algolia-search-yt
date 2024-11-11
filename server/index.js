const { searchClient } = require('@algolia/client-search')
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const app = express()

const client = searchClient(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY,
)

mongoose
  .connect(process.env.MONGO_URI, {})
  .catch(console.error)
  .then(() => console.log('Connected to MongoDB'))

const User = mongoose.model('User', new mongoose.Schema({}))

const changeStream = User.watch()

const USERS_INDEX = 'users_index_yt'

const addToIndex = async data => {
  try {
    const { _id, name, email } = data

    const userObject = {
      objectID: _id.toString(),
      name,
      email,
    }

    await client.saveObject({
      indexName: USERS_INDEX,
      body: userObject,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateIndex = async (id, data) => {
  try {
    const { password: _, ...updatedFields } = data

    await client.partialUpdateObject({
      indexName: USERS_INDEX,
      objectID: id,
      attributesToUpdate: updatedFields,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteFromIndex = async id => {
  try {
    await client.deleteObject({
      indexName: USERS_INDEX,
      objectID: id,
    })
  } catch (error) {
    console.log(error)
  }
}

changeStream.on('change', async data => {
  console.log(data)

  const {
    operationType,
    fullDocument,
    documentKey: { _id },
  } = data

  const documentId = _id.toString()

  switch (operationType) {
    case 'insert':
      await addToIndex(fullDocument)
      break

    case 'update':
      const {
        updateDescription: { updatedFields },
      } = data
      await updateIndex(documentId, updatedFields)
      break

    case 'delete':
      await deleteFromIndex(documentId)
      break

    default:
      break
  }
})

app.listen(8000, () => {
  console.log('Server running on port 8000')
})
