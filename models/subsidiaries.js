var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
const subsidiarySchema = new mongoose.Schema(
  {
    "subsidiaryId": {
      "type": "Number"
    },
    "razonSocial": {
      "type": "String",
      "required": "true"
    },
    "rfc": {
      "type": "String",
      "required": "true"
    },
    "regimen": {
      "type": "String",
      "required": "true"
    },
    "direccion": {
      "type": "String",
      "required": "true"
    },
    "ciudad": {
      "type": "String"
    },
    "estado": {
      "type": "String"
    },
    "zip": {
      "type": "String",
      "required": "true"
    },
    "fiel": {
      "type": "String"
    },
    "key": {
      "type": "String"
    },
    "psw": {
      "type": "String"
    },
    "representanteLegal": {
      "type": "String"
    },
    "rfcRepresentanteLegal": {
      "type": "String"
    },
    "registroPatronal": {
      "type": "String"
    },
    "sucursal": {
      "type": "String"
    },
    "estatus": {
      "type": "String"
    }
  }
);
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' });
// var subsidiary = mongoose.model('subsidiaries', subsidiarySchema);
// User.plugin(passportLocalMongoose);
// module.exports = subsidiary
module.exports = { subsidiary: subsidiarySchema  }