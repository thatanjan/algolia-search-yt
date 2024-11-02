import mongoose from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const userSchema = new mongoose.Schema({
  name: requiredString,
  email: { ...requiredString, unique: true },
  password: requiredString,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
