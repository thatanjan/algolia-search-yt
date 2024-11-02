const { searchClient } = require('@algolia/client-search')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const User = mongoose.model('User', new mongoose.Schema({}))

const client = searchClient(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY,
)

// Fetch and index objects in Algolia
const processRecords = async () => {
  await mongoose.connect(MONGO_URI)

  console.log('Connected to MongoDB')

  let users = await User.find(
    {
      // _id: '59b99de4cfa9a34dcd788617'
    },
    'name email',
  )

  const usersObject = users.map(user => {
    const { _id, ...restUser } = user.toObject()

    return {
      objectID: _id.toString(),
      ...restUser,
    }
  })

  // const user = usersObject[0]

  // await client.partialUpdateObject({
  //   indexName: 'users_index',
  //   objectID: user.objectID,
  //   attributesToUpdate: {
  //     password: '123456',
  //   },
  // })

  return await client.saveObjects({
    indexName: 'users_index',
    objects: usersObject,
  })
}

processRecords()
  .then(() => {
    console.log('Successfully indexed objects!')
    process.exit(0)
  })
  .catch(err => console.error(err))
