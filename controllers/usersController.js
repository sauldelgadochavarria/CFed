const asyncHandler = require("express-async-handler");
var users = require('../models/User.js');
var permisos = require('../models/permisions.js');

// users
exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.locals = { title: 'Users' };
    setUser(req)
          .then((subsidiaries) => {
                console.log("ok alta correctoa")
                // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                getUsers(req.body)
                      .then((subsidiaries) => {
                            //      res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                            // res.redirect(302,'/config-subsidiaries');
                            var respuesta ='ok'
                            res.send({"respuesta":respuesta});
                      })
                      .catch((err) => {
                            console.log(JSON.stringify('setUser : '+err));
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
                console.log('getusers: ' + users.length+ ' '+JSON.stringify(users));
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
                console.log("users a editar:"+JSON.stringify(usrs));
                res.render('Configurations/config-update-users', { "user": usrs, "permisos": permisos });
          })
          .catch((err) => {
                console.log(JSON.stringify('no encontrada subsidiary'));
          });

  });
  exports.user_update_post = asyncHandler(async (req, res, next) => {
            res.locals = { title: 'Users' };
            updateUser(req)
                  .then((subsidiaries) => {
                        console.log("update users ok")
                        // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                  })
                  .catch((err) => {
                        console.log("error al guardar users");
                  });
            console.log(JSON.stringify(req.body));
            getUsers(req.body)
                  .then((usrs) => {
                        res.render('Configurations/config-users', { "users": usrs });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('users'+err));
                  });

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
              console.log(' fnc getUser:'+req)
            //   const myuser = mongoose.model('users', users);
            console.log("getUser:"+req)
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
              } catch (error) {
                    console.log(error);
              }

              console.log("Saliendo de a upd:" + updatedResult)
              return updatedResult
              // var datos = req.body;
              // delete  datos._id
              // const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
              // var doc =  mysub.findByIdAndUpdate(req.body._id, req.body)
              // await doc.save();
        } catch (err) {
              console.error(err);
              return [];

        }
  }

//   module.exports = {
//     getProducts,
//     getProduct,
//     createProduct,
//     updateProduct,
//     deleteProduct
// }