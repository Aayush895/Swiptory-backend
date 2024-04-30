const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      res.send({ message: 'Please give proper values in the input field' })
    }

    const hashedPass = await bcrypt.hash(password, 10)
    await User.create({ userName, email, password: hashedPass })

    res.send({
      message: 'User was registered successfully',
    })
  } catch (error) {
    console.log(error)
    throw new Error('Check entered user details: ', error)
  }
}

const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body
    const findUser = await User.findOne({ userName })
    const isValidCreds = await bcrypt.compare(password, findUser?.password)

    if (!isValidCreds) {
      res.send({
        message: 'Invalid credentials, Please enter correct details',
      })
    }

    const token = jwt.sign(
      { userID: findUser?._id, userName: findUser?.userName },
      process.env.JWT_SECRET
    )

    res.send({
      message: 'User was logged in successfully',
      status: 'Success',
      token,
    })
  } catch (error) {
    console.log(error)
    throw new Error('Check login credentials')
  }
}

const showUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.send({
      message: 'All users were fetched successfully',
      users,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { registerUser, logIn, showUsers }
