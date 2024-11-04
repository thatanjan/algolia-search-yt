'use server'

import User from '@/models/User'

const addDoc = async formData => {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const newUser = new User(data)

    await newUser.save()

    return {
      success: true,
      message: 'User created successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

const deleteDoc = async id => {
  try {
    await User.deleteOne({ _id: id })

    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

const getDocs = async () => {
  try {
    const userDocs = await User.find({}, '', {
      sort: { _id: -1 },
      limit: 5,
    })

    // Convert doc to plain object
    const users = userDocs.map(user => ({
      ...user.toObject(),
      _id: user._id.toString(),
    }))

    return {
      success: true,
      message: 'Users found',
      data: users,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

const getDoc = async id => {
  try {
    const user = await User.findById(id)

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      }
    }

    return {
      success: true,
      message: 'User found',
      data: user.toObject(),
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const updateDoc = async (id, formData) => {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    await User.findByIdAndUpdate(id, data)

    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    console.log('updateDoc', error)
    return {
      success: false,
      message: error.message,
    }
  }
}

export { addDoc, deleteDoc, getDoc, updateDoc, getDocs }
