const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  userName: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User