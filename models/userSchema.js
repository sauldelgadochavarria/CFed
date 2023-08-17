var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
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
    // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    match: /[0-9]*/,
    minlength: 6
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  roles: {
    type: Map,
    of: String
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
userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' });
var User = mongoose.model('User', userSchema);
// User.plugin(passportLocalMongoose);
module.exports = User

// userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' });
// var subsidiary = mongoose.model('subsidiaries', subsidiarySchema);
// User.plugin(passportLocalMongoose);
// module.exports = subsidiary
// module.exports = { userschema: userSchema  }