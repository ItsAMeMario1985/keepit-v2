import User from '../models/UserModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (email, password) => {
  // try {
  const user = await User.findOne({
    email,
  })
  if (!user) {
    return {
      message: 'Error: User not exist.',
    }
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return {
      message: 'Error: Incorrect Password',
    }
  }

  const payload = {
    user: {
      id: user.id,
    },
  }
  return new Promise((resolve) => {
    jwt.sign(
      payload,
      'randomString',
      {
        expiresIn: '180d',
      },
      (error, token) => {
        if (error) return reject(error)
        resolve({ token: token })
      }
    )
  })
  // } catch (e) {
  //   console.error(e)
  //   return {
  //     message: 'Login Error' + e,
  //   }
  // }
}

const signup = async (email, password) => {
  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return {
        message: 'Error: User already exist.',
      }
    }

    user = new User({
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    return new Promise((resolve) => {
      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: '180d',
        },
        (error, token) => {
          if (error) return reject(error)
          resolve({ token: token })
        }
      )
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Error in saving user')
  }
}

module.exports = {
  login,
  signup,
}
