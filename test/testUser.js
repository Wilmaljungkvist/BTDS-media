
import AuthModel from '../src/models/AuthModel.js'

async function addUser() {
  try {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      password: 'password123'
    }

    const userId = await AuthModel.register(userData)

    console.log('User added successfully! User ID:', userId)
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

addUser()
