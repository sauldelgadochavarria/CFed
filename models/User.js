var mongoose = require('mongoose')
var Schema = mongoose.Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 8
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  email: {
    type: String,
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  created: {
    type: Date,
    default: new Date()
  }
})

var User = mongoose.model('User', userSchema)
module.exports = User