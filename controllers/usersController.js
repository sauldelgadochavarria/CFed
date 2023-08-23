const asyncHandler = require("express-async-handler");
var users = require('../models/User.js');
var permisos = require('../models/permisions.js');
var subsidiaries = require('../models/subsidiaries.js');
var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)
const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
// users
exports.user_create_get = asyncHandler(async (req, res, next) => {
      res.locals = { title: 'Agrega Usuario' };
      res.render('Configurations/config-add-users', { "permisos": permisos });
});
exports.user_create_post = asyncHandler(async (req, res, next) => {
      res.locals = { title: 'Users' };
      setUser(req)
            .then((subsidiaries) => {
                  console.log("ok alta correctoa")
                  getUsers(req.body)
                        .then((subsidiaries) => {
                              var respuesta = 'ok'
                              res.send({ "respuesta": respuesta });
                        })
                        .catch((err) => {
                              console.log(JSON.stringify('setUser : ' + err));
                        });
            })
            .catch((err) => {
                  console.log("error al guardar setUser");
            });
      console.log(JSON.stringify(req.body));

});

exports.user_getusers_get = asyncHandler(async (req, res, next) => {
      res.locals = { title: 'Usuarios' };
      getUsers(req.body)
            .then((users) => {
                  console.log('getusers: ' + users.length + ' ' + JSON.stringify(users));
                  res.render('Configurations/config-users', { "users": users });
            })
            .catch((err) => {
                  console.log(JSON.stringify(' error getusers '));
            });
});

exports.user_update_get = asyncHandler(async (req, res, next) => {
      console.log("entre user_updates_get:" + req.query.id)
      var subid = req.query.id
      // const nsub = new mysub(req.body)
      getUser(subid)
            .then((usrs) => {
                  console.log(usrs);
                  res.locals = { title: 'Edit Users' };
                  console.log("users a- editar:" + permisos);
                  console.log("users a- editar:" + JSON.stringify(permisos));
                  getSubsidiaries().then((subs) => {
                        console.log("users a- editar subs:" + JSON.stringify(subs));
                        res.render('Configurations/config-update-users', { "user": usrs, "permisos": permisos, "subsidiarias": subs });
                  });
            })
            .catch((err) => {
                  console.log(JSON.stringify('no encontrada subsidiary'));
            });

});
exports.user_update_post = asyncHandler(async (req, res, next) => {

      updateUser(req)
            .then((updtresult) => {
                  console.log("update users respuesta:" + updtresult);
                  res.locals = { title: 'Users' };
                  res.send({ "respuesta": updtresult });
                  //  respuesta = 'ok'
                  // getUsers()
                  // .then((subsidiaries) => {
                  //     var respuesta = 'ok'
                  //     res.send({ "respuesta": respuesta });
                  // })
                  // .catch((err) => {
                  //     console.log( err);
                  // });
            })
            .catch((err) => {
                  console.log("error al guardar users" + err);
            });
      console.log(JSON.stringify(req.body));

});

async function getUsers(req) {
      try {
            //   const coll = db.collection("users");
            const usrs = await users.find();
            return usrs
            // .slice(0, 10);;
      } catch (err) {
            console.error(err);
            return [];
      }
      return users
}
async function setUser(req) {
      try {
            // console.log(req.body)
            // const myusr = users.model('users', users);
            const nuser = new users(req.body);
            await nuser.save();
      } catch (err) {
            console.error(err);
            return [];

      }
}
async function getUser(req) {
      try {
            console.log(' fnc getUser:' + req)
            //   const myuser = mongoose.model('users', users);
            console.log("getUser:" + req)
            var muser = users.findById(req)
            // var mysub =await nsub.save();
            return muser
      } catch (err) {
            console.error(err);
            return [];

      }
}
async function updateUser(req) {
      try {

            var datos = req.body;
            var id = datos._id;
            console.log("entrando a upd:" + datos._id + '-' + datos.razonSocial)
            delete datos._id
            try {
                  console.log('new udtresult DATOS::' + JSON.stringify(datos));
                  console.log('new udtresult DATOS id::' + id);
                  const updatedResult = await users.findByIdAndUpdate(
                        { _id: id },
                        datos,
                  );
                  console.log('new udtresult:' + updatedResult);
                  return 'ok'

            } catch (error) {
                  console.log(error);
            }

      } catch (err) {
            console.error(err);
            return [];

      }
}
async function getSubsidiaries(req) {
      try {
            //   const coll = db.collection("users");
            const sbus = await mysub.find().select("_id, razonSocial");
            var myarr =[];
            i=0;
            sbus.forEach(element => {
                  var snsub= {}
                  snsub._id = element._id;
                  snsub.id = i;
                  snsub.razonSocial = element.razonSocial;  
                  myarr.push(snsub);            
                  i++;
            });
            // var myarr =
            return myarr
            // .slice(0, 10);;
      } catch (err) {
            console.error(err);
            return [];
      }
      // return users
}

//   module.exports = {
//     getProducts,
//     getProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct
// }