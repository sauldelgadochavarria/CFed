const asyncHandler = require("express-async-handler");
var subsidiaries = require('../models/subsidiaries.js');
var config = require('../config');
var users = require('../models/User.js');
var regimens = require('../models/regimens.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)
const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);

// subsuridiaries
exports.subsidiary_create_post = asyncHandler(async (req, res, next) => {
    res.locals = { title: 'Subsidiaries' };
    setSubsidiaries(req)
        .then((subsidiaries) => {
            console.log("ok subsidiary_create_post")
            // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
            getSubsidiaries(req.body)
                .then((subsidiaries) => {
                    //      res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                    // res.redirect(302,'/config-subsidiaries');
                    var respuesta = 'ok'
                    res.send({ "respuesta": respuesta });
                })
                .catch((err) => {
                    console.log(JSON.stringify('getSubsidiaries' + err));
                });
        })
        .catch((err) => {
            console.log("error al guardar subsidiaries");
        });
    console.log(JSON.stringify(req.body));
});

exports.subsidiary_getsubsidiaries_get = asyncHandler(async (req, res, next) => {
    res.locals = { title: 'Subsidiaries' };
    sess = req.session;
    console.log('sesion getsubsidiaries:'+JSON.stringify(req.session));
    var isrolevalid =validateRole(sess, 'subsidiary_getsubsidiaries_get');
    console.log('isrolevalid:'+isrolevalid);
    isrolevalid = true;
    if (!isrolevalid){
        res.locals = { title: 'Error 404 Sin Permiso' };
		res.redirect('/');
    } else{
    getSubsidiaries(req.body)
        .then((subsidiaries) => {
            console.log('subsidiaries: ' + subsidiaries.length);
            res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });

        })
        .catch((err) => {
            console.log(JSON.stringify('pagosvacio'));
        });
    }
});

exports.subsidiary_updatesubsidiaries_get = asyncHandler(async (req, res, next) => {
    // req
    console.log("entre ubsidiary_updatesubsidiaries_get:" + req.query.id)
    var subid = req.query.id
    // const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
    getSubsidiary(subid)
        .then((subsidiary) => {
            console.log(subsidiary);
            res.locals = { title: 'Edit Subsidiaries' };
            console.log("subsidiaria a editar:" + JSON.stringify(subsidiary));
            res.render('Configurations/config-update-subsidiaries', { "subsidiary": subsidiary, "regimen": regimens });
        })
        .catch((err) => {
            console.log(JSON.stringify('no encontrada subsidiary'));
        });
});
exports.subsidiary_updatesubsidiaries_post = asyncHandler(async (req, res, next) => {
    res.locals = { title: 'Subsidiaries' };

    console.log("entrando update subsidiary ")
    updateSubsidiary(req)
        .then((subsidiaries) => {
            console.log("update ok:"+subsidiaries)
            res.send({ "respuesta": subsidiaries });
            // getSubsidiaries(req.body)
            // .then((subsidiaries) => {
            //     //      res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
            //     // res.redirect(302,'/config-subsidiaries');
            //     var respuesta = 'ok'
            //     res.send({ "respuesta": respuesta });
            // })
            // .catch((err) => {
            //     console.log(JSON.stringify('getSubsidiaries' + err));
            // });
        })
        .catch((err) => {
            console.log("error al guardar subsidiaries");
        });


});
// subsidiaries
async function getSubsidiaries(req) {
    try {
        console.log(req.body)
        //   const coll = db.collection("subsidiaries");
        //   const subs = await coll.find().toArray();
        // console.log("invoices:", invoices);
        // db.close();
        var subs = mysub.find();
        return subs
    } catch (err) {
        console.error(err);
        return [];
    }
}
async function setSubsidiaries(req) {
    try {
        // console.log(req.body)
        const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
        const nsub = new mysub(req.body);
        await nsub.save();
    } catch (err) {
        console.error(err);
        return [];

    }
}
async function getSubsidiary(req) {
    try {
        console.log('getSubsidiary'+req)
        const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
        var xysub = mysub.findById(req);
        return xysub
    } catch (err) {
        console.error(err);
        return [];

    }
}
async function updateSubsidiary(req) {
    try {
        console.log('fn UpdateSubsidiary: '+JSON.stringify(req.body));
        var datos = req.body;
        var id = datos._id;
        console.log("entrando a upd:" + datos._id + '-' + datos.razonSocial)
        delete datos._id
        const updatedResult = await mysub.findByIdAndUpdate(
            { _id: id },
            datos,
        );
        console.log("Saliendo de a upd:ok" )
        return 'ok'

    } catch (err) {
        console.error(err);
        return [];

    }
}

function validateRole(sess, registro){
    var roles = sess.roles;
    var rolesPermited = getPermitedRoles(registro)
    var permitido = false;
    for (var i = 0; i < rolesPermited.length; i++) {
        for (var j = 0; j < roles.length; j++) {
            if (rolesPermited[i]== roles[j].TipodeCFDI) {
                permitido =true;
                break;
            } 
           
        }
    }
    return permitido
}

function getPermitedRoles(registro){
    return ['xactura', 'SUPERVISOR']
}



