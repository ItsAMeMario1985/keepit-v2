import User from '../models/UserModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (email, password) => {
  try {
    const user = await User.findOne({
      email,
    })
    if (!user)
      return {
        message: 'User Not Exist',
      }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return {
        message: 'Incorrect Password !',
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
        (err, token) => {
          if (err) throw err
          resolve({ token: token })
        }
      )
    })
  } catch (e) {
    console.error(e)
    return {
      message: 'Login Error' + e,
    }
  }
}

const signup = async (email, password) => {
  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return res.status(400).json({
        msg: 'User Already Exists',
      })
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
        (err, token) => {
          if (err) throw err
          resolve({ token: token })
        }
      )
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Error in Saving')
  }
}

module.exports = {
  login,
  signup,
}
