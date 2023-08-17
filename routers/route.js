var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var axios = require('axios').default;
var validator = require('express-validator');
//** 
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config');
var payments = require('../Libs/detalleCfidiPagos.js');
var regimens = require('../models/regimens.js')
const admz = require('adm-zip');
const fs = require('fs');
var subsidiaries = require('../models/subsidiaries.js');
var permisos = require('../models/permisions.js');
var users = require('../models/User.js');
// var usersSchema = require('../models/User.js');
// const ingreso = mongoose.model( subsidiaries);
// nuevo conecta a bd
// var User = require('../models/User')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)
const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
const updateDocument = async (id, datos) => {
      try {
            console.log('new udtresult DATOS::' + JSON.stringify(datos));
            console.log('new udtresult DATOS id::' + id);
            const updatedResult = await mysub.findByIdAndUpdate(
                  { _id: id },
                  datos,
            );
            console.log('new udtresult:' + updatedResult);
      } catch (error) {
            console.log(error);
      }
};

var db = mongoose.connection

//**

module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            console.log(JSON.stringify(req.session));
            if (sess.user) {

                  return next();
            }
            else { res.redirect('/login'); }
      }
      function genToken(req) {
            console.log('gen token:' + JSON.stringify(req.session));
            var mytoken = 'fasd-token-asdad';
            return mytoken
      }
      function genEmployess(req) {
            var employees = [{ Name: "Airi Satou", Positiion: "Accountant", Office: "Tokyo", Age: 33, StartDate: "28/11/2008", Salary: "$162,700" },
            { Name: "Angelica Ramo_cs", Positiion: "Chief Executive Officer (CEO)", Office: "London", Age: 47, StartDate: "09/10/2009", Salary: "$1,200,000" },
            { Name: "Ashton Cox", Positiion: "Junior Technical Author", Office: "San Francisco", Age: 66, StartDate: "12/01/2009", Salary: "$86,000" },
            { Name: "Bradley Greer", Positiion: "Software Engineer", Office: "London", Age: 41, StartDate: "13/10/2012", Salary: "$132,000" },
            { Name: "Brenden Wagner", Positiion: "Software Engineer", Office: "San Francisco", Age: 28, StartDate: "07/06/2011", Salary: "$206,850" },
            { Name: "Brielle Williamson", Positiion: "Integration Specialist", Office: "New York", Age: 61, StartDate: "02/12/2012", Salary: "$372,000" },
            { Name: "Bruno Nash", Positiion: "Software Engineer", Office: "London", Age: 38, StartDate: "03/05/2011", Salary: "$163,500" },
            { Name: "Caesar Vance", Positiion: "Pre-Sales Support", Office: "New York", Age: 21, StartDate: "12/12/2011", Salary: "$106,450" },
            { Name: "Cara Stevens", Positiion: "Sales Assistant", Office: "New York", Age: 46, StartDate: "06/12/2011", Salary: "$145,600" },
            { Name: "Cedric Kelly", Positiion: "Senior Javascript Developer", Office: "Edinburgh", Age: 22, StartDate: "29/03/2012", Salary: "$433,060" },
            { Name: "Charde Marshall", Positiion: "Regional Director", Office: "San Francisco", Age: 36, StartDate: "16/10/2008", Salary: "$470,600" },
            { Name: "Colleen Hurst", Positiion: "Javascript Developer", Office: "San Francisco", Age: 39, StartDate: "15/09/2009", Salary: "$205,500" },
            { Name: "Dai Rios", Positiion: "Personnel Lead", Office: "Edinburgh", Age: 35, StartDate: "26/09/2012", Salary: "$217,500" },
            { Name: "Donna Snider", Positiion: "Customer Support", Office: "New York", Age: 27, StartDate: "25/01/2011", Salary: "$112,000" },
            { Name: "Doris Wilder", Positiion: "Sales Assistant", Office: "Sidney", Age: 23, StartDate: "20/09/2010", Salary: "$85,600" },
            { Name: "Finn Camacho", Positiion: "Support Engineer", Office: "San Francisco", Age: 47, StartDate: "07/07/2009", Salary: "$87,500" },
            { Name: "Fiona Green", Positiion: "Chief Operating Officer (COO)", Office: "San Francisco", Age: 48, StartDate: "11/03/2010", Salary: "$850,000" },
            { Name: "Garrett Winters", Positiion: "Accountant", Office: "Tokyo", Age: 63, StartDate: "25/07/2011", Salary: "$170,750" },
            { Name: "Gavin Cortez", Positiion: "Team Leader", Office: "San Francisco", Age: 22, StartDate: "26/10/2008", Salary: "$235,500" },
            { Name: "Gavin Joyce", Positiion: "Developer", Office: "Edinburgh", Age: 42, StartDate: "22/12/2010", Salary: "$92,575" },
            { Name: "Gloria Little", Positiion: "Systems Administrator", Office: "New York", Age: 59, StartDate: "10/04/2009", Salary: "$237,500" },
            { Name: "Haley Kennedy", Positiion: "Senior Marketing Designer", Office: "London", Age: 43, StartDate: "18/12/2012", Salary: "$313,500" },
            { Name: "Hermione Butler", Positiion: "Regional Director", Office: "London", Age: 47, StartDate: "21/03/2011", Salary: "$356,250" },
            { Name: "Herrod Chandler", Positiion: "Sales Assistant", Office: "San Francisco", Age: 59, StartDate: "06/08/2012", Salary: "$137,500" },
            { Name: "Hope Fuentes", Positiion: "Secretary", Office: "San Francisco", Age: 41, StartDate: "12/02/2010", Salary: "$109,850" },
            { Name: "Howard Hatfield", Positiion: "Office Manager", Office: "San Francisco", Age: 51, StartDate: "16/12/2008", Salary: "$164,500" },
            { Name: "Jackson Bradshaw", Positiion: "Director", Office: "New York", Age: 65, StartDate: "26/09/2008", Salary: "$645,750" },
            { Name: "Jena Gaines", Positiion: "Office Manager", Office: "London", Age: 30, StartDate: "19/12/2008", Salary: "$90,560" },
            { Name: "Jenette Caldwell", Positiion: "Development Lead", Office: "New York", Age: 30, StartDate: "03/09/2011", Salary: "$345,000" },
            { Name: "Jennifer Acosta", Positiion: "Junior Javascript Developer", Office: "Edinburgh", Age: 43, StartDate: "01/02/2013", Salary: "$75,650" },
            { Name: "Jennifer Chang", Positiion: "Regional Director", Office: "Singapore", Age: 28, StartDate: "14/11/2010", Salary: "$357,650" },
            { Name: "Jonas Alexander", Positiion: "Developer", Office: "San Francisco", Age: 30, StartDate: "14/07/2010", Salary: "$86,500" },
            { Name: "Lael Greer", Positiion: "Systems Administrator", Office: "London", Age: 21, StartDate: "27/02/2009", Salary: "$103,500" },
            { Name: "Martena Mccray", Positiion: "Post-Sales support", Office: "Edinburgh", Age: 46, StartDate: "09/03/2011", Salary: "$324,050" },
            { Name: "Michael Bruce", Positiion: "Javascript Developer", Office: "Singapore", Age: 29, StartDate: "27/06/2011", Salary: "$183,000" },
            { Name: "Michael Silva", Positiion: "Marketing Designer", Office: "London", Age: 66, StartDate: "27/11/2012", Salary: "$198,500" },
            { Name: "Michelle House", Positiion: "Integration Specialist", Office: "Sidney", Age: 37, StartDate: "02/06/2011", Salary: "$95,400" },
            { Name: "Olivia Liang", Positiion: "Support Engineer", Office: "Singapore", Age: 64, StartDate: "03/02/2011", Salary: "$234,500" },
            { Name: "Paul Byrd", Positiion: "Chief Financial Officer (CFO)", Office: "New York", Age: 64, StartDate: "09/06/2010", Salary: "$725,000" },
            { Name: "Prescott Bartlett", Positiion: "Technical Author", Office: "London", Age: 27, StartDate: "07/05/2011", Salary: "$145,000" },
            { Name: "Quinn Flynn", Positiion: "Support Lead", Office: "Edinburgh", Age: 22, StartDate: "03/03/2013", Salary: "$342,000" },
            { Name: "Rhona Davidson", Positiion: "Integration Specialist", Office: "Tokyo", Age: 55, StartDate: "14/10/2010", Salary: "$327,900" },
            { Name: "Sakura Yamamoto", Positiion: "Support Engineer", Office: "Tokyo", Age: 37, StartDate: "19/08/2009", Salary: "$139,575" },
            { Name: "Serge Baldwin", Positiion: "Data Coordinator", Office: "Singapore", Age: 64, StartDate: "09/04/2012", Salary: "$138,575" },
            { Name: "Shad Decker", Positiion: "Regional Director", Office: "Edinburgh", Age: 51, StartDate: "13/11/2008", Salary: "$183,000" },
            { Name: "Shou Itou", Positiion: "Regional Marketing", Office: "Tokyo", Age: 20, StartDate: "14/08/2011", Salary: "$163,000" },
            { Name: "Sonya Frost", Positiion: "Software Engineer", Office: "Edinburgh", Age: 23, StartDate: "13/12/2008", Salary: "$103,600" },
            { Name: "Suki Burks", Positiion: "Developer", Office: "London", Age: 53, StartDate: "22/10/2009", Salary: "$114,500" },
            { Name: "Tatyana Fitzpatrick", Positiion: "Regional Director", Office: "London", Age: 19, StartDate: "17/03/2010", Salary: "$385,750" },
            { Name: "Thor Walton", Positiion: "Developer", Office: "New York", Age: 61, StartDate: "11/08/2013", Salary: "$98,540" },
            { Name: "Tiger Nixon", Positiion: "System Architect", Office: "Edinburgh", Age: 61, StartDate: "25/04/2011", Salary: "$320,800" },
            { Name: "Timothy Mooney", Positiion: "Office Manager", Office: "London", Age: 37, StartDate: "11/12/2008", Salary: "$136,200" },
            { Name: "Unity Butler", Positiion: "Marketing Designer", Office: "San Francisco", Age: 47, StartDate: "09/12/2009", Salary: "$85,675" },
            { Name: "Vivian Harrell", Positiion: "Financial Controller", Office: "San Francisco", Age: 62, StartDate: "14/02/2009", Salary: "$452,500" },
            { Name: "Yuri Berry", Positiion: "Chief Marketing Officer (CMO)", Office: "New York", Age: 40, StartDate: "25/06/2009", Salary: "$675,000" },
            { Name: "Zenaida Frank", Positiion: "Software Engineer", Office: "New York", Age: 63, StartDate: "04/01/2010", Salary: "$125,250" },
            { Name: "Zorita Serrano", Positiion: "Software Engineer", Office: "San Francisco", Age: 56, StartDate: "01/06/2012", Salary: "$115,000" }];
            return employees
      }
      // users
      async function getUsers(req) {
            try {
                  const coll = db.collection("users");
                  const usrs = await coll.find().toArray();
                  return usrs
                  // .slice(0, 10);;
            } catch (err) {
                  return [];
                  console.error(err);
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
                  // console.log(req.body)
                  const myuser = mongoose.model('users', users);
                  var muser = myuser.findById(req)
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
      // subsidiaries
      async function genSubsidiaries(req) {
            // var subsidiaries = [
            //       // {
            //       //       name: "Proveedor de Insumos SA",
            //       //       rfc: "XAXX010101000",
            //       //       regimen: 601,
            //       //       direccion: "JUAREZ 3011",
            //       //       ciudad: "MONTERREY",
            //       //       state: "NUEVO LEON",
            //       //       codigopostal: 64000,
            //       //       sucursal: "CENTRO"
            //       // },
            //       // {
            //       //       name: "Proveedor de Insumos del Norte SA",
            //       //       rfc: "XAXX010102000",
            //       //       regimen: 601,
            //       //       direccion: "REVOLUCION 40050",
            //       //       ciudad: "MONTERREY",
            //       //       state: "NUEVO LEON",
            //       //       codigopostal: 65000,
            //       //       sucursal: "GARZA SADA"
            //       // }

            // ];
            // return subsidiaries
            try {
                  // console.log(req.body)
                  const coll = db.collection("subsidiaries");
                  const subs = await coll.find().toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  return subs
                  // .slice(0, 10);;
            } catch (err) {
                  return [];
                  console.error(err);
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
                  // console.log(req.body)
                  const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
                  var xysub = mysub.findById(req)
                  // var mysub =await nsub.save();
                  return xysub
            } catch (err) {
                  console.error(err);
                  return [];

            }
      }
      async function updateSubsidiary(req) {
            try {

                  var datos = req.body;
                  var id = datos._id;
                  console.log("entrando a upd:" + datos._id + '-' + datos.razonSocial)
                  delete datos._id

                  var ok = updateDocument(id, datos)

                  console.log("Saliendo de a upd:" + ok)
                  return ok
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
      // invioces
      function procesainvoices(lcfd) {

            result = [];
            try {
                  for (j = 0; j < lcfd.length; j++) {
                        obj = {};
                        var cp = lcfd[j];
                        //Generales

                        obj.VersionCfdi = cp.Comprobante.Version;
                        var existeDom = cp.Comprobante.Receptor.hasOwnProperty("DomicilioFiscalReceptor")
                        if (existeDom) {
                              obj.DomicilioFiscalReceptor = cp.Comprobante.Receptor.DomicilioFiscalReceptor;
                        } else {
                              obj.DomicilioFiscalReceptor = "";
                        }
                        obj.NombreReceptor = cp.Comprobante.Receptor.Nombre;
                        obj.RegimenFiscalReceptor = cp.Comprobante.Receptor.RegimenFiscalReceptor;
                        obj.RfcReceptor = cp.Comprobante.Receptor.Rfc;
                        obj.UsoCFDI = cp.Comprobante.Receptor.UsoCFDI;
                        obj.Fecha = cp.Comprobante.Fecha;
                        obj.LugarExpedicion = cp.Comprobante.LugarExpedicion;
                        obj.Serie = cp.Comprobante.Serie;
                        obj.NombreEmisor = cp.Comprobante.Emisor.Nombre;
                        obj.RegimenFiscalEmisor = cp.Comprobante.Emisor.RegimenFiscal;
                        obj.RfcEmisor = cp.Comprobante.Emisor.Rfc;
                        obj.Total = cp.Comprobante.Total
                        obj.UUID = cp._id;
                        obj.TipoDeComprobante = cp.Comprobante.TipoDeComprobante;
                        obj.Archivo = cp._id + '.xml'
                        result.push(obj);

                  }
            } catch (e) { console.error(e); }
            return result

      }
      async function getInvoices(req) {
            try {
                  //  console.log(req.body);
                  const coll = db.collection("invoices");
                  const invoices = await coll.find().toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  return invoices;
            } catch (err) {
                  console.error(err);
            }
      }

      async function getInvoicesPayRol(req) {
            try {
                  // console.log(req.body)
                  const coll = db.collection("nomina");
                  const payrol = await coll.find().toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  return payrol
                  // .slice(0, 10);;
            } catch (err) {
                  console.error(err);
            }
      }

      async function getVendorTax_OLD(req) {
            try {
                  const coll = db.collection("iva");
                  const vendortax = await coll.find().toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  return vendortax
                  // .slice(0, 10);;
            } catch (err) {
                  console.error(err);
            }
      }

      async function getVendorTax(myparam) {
            try {
                  console.log(typeof myparam + " " + JSON.stringify(myparam));
                  var tabla = myparam.tipo.toString();
                  var fini = new Date(myparam.fini);
                  var ffin = new Date(myparam.ffin)
                  console.log('fechaini:' + fini.toString());
                  const coll = db.collection(tabla);
                  const payments = await coll.find({
                        'Comprobante.Fecha': {
                              '$gte': fini,
                              '$lt': ffin
                              // '$gte': new Date('2023-04-01 00:00:00'),
                              // '$lt': new Date('2023-04-30 23:59:59:999')
                        }
                  }).toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  // var lista =procesaPagos(vendortax)

                  return payments
                  // .slice(0, 10);;
            } catch (err) {
                  console.error(err); return []
            }
      }

      async function getCfdis(myparam) {
            try {
                  console.log(typeof myparam + " " + JSON.stringify(myparam));
                  var tabla = myparam.tipo.toString();
                  var fini = new Date(myparam.fini);
                  var ffin = new Date(myparam.ffin)
                  console.log('fechaini:' + fini.toString());
                  const coll = db.collection(tabla);
                  const payments = await coll.find({
                        'Comprobante.Fecha': {
                              '$gte': fini,
                              '$lt': ffin
                              // '$gte': new Date('2023-04-01 00:00:00'),
                              // '$lt': new Date('2023-04-30 23:59:59:999')
                        }
                  }).toArray();
                  // console.log("invoices:", invoices);
                  // db.close();
                  // var lista =procesaPagos(vendortax)

                  return payments
                  // .slice(0, 10);;
            } catch (err) {
                  console.error(err);
            }
      }

      app.get('/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dashboard' };
            // var desktops =[20,30,40]
            res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
            res.redirect('Dashboard');
      });
      app.get('/Dashboard', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dashboard' };
            // res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
            var desktops = { datos: [25, 11, 22, 27, 13, 22, 37, 21, 44, 22, 54] };
            res.render('Dashboard/index', { "desktops": desktops });
      });

      // Layouts
      app.get('/layouts-horizontal', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal' };
            res.render('Dashboard/index', { layout: 'layoutsHorizontal' });
      });
      app.get('/layouts-dark-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Light Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsDarkSidebar' });
      });
      app.get('/layouts-compact-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Compact Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsCompactSidebar' });
      });
      app.get('/layouts-icon-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Icon Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsIconSidebar' });
      });
      app.get('/layouts-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsBoxed' });
      });
      app.get('/layouts-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsPreloader' });
      });
      app.get('/layouts-colored-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsColoredSidebar' });
      });

      app.get('/layouts-hori-topbar-dark', isUserAllowed, function (req, res) {
            res.locals = { title: 'Topbar Dark' };
            res.render('Dashboard/index', { layout: 'layoutsHTopbarDark' });
      });
      app.get('/layouts-hori-boxed-width', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsHBoxed' });
      });
      app.get('/layouts-hori-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsHPreloader' });
      });


      // Color Theme vertical
      app.get("/vertical-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Dark' };
            res.render("Dashboard/index", { layout: "vertical-dark-layout" });
      });

      app.get("/vertical-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Rtl' };
            res.render("Dashboard/index", { layout: "vertical-rtl-layout" });
      });

      // Color Theme Horizontal
      app.get("/horizontal-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Dark' };
            res.render("Dashboard/index", { layout: "horizontal-dark-layout" });
      });

      app.get("/horizontal-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Rtl' };
            res.render("Dashboard/index", { layout: "horizontal-rtl-layout" });
      });

      // Calendar
      app.get('/calendar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Calendar' };
            res.render('Calendar/calendar');
      });

      // Chat
      app.get('/chat', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chat' };
            res.render('Chat/chat');
      });

      // Ecomerce
      app.get('/ecommerce-products', isUserAllowed, function (req, res) {
            res.locals = { title: 'Products' };
            res.render('Ecommerce/ecommerce-products');
      });
      app.get('/ecommerce-product-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Product Detail' };
            res.render('Ecommerce/ecommerce-product-detail');
      });
      app.get('/ecommerce-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Ecommerce/ecommerce-orders');
      });
      app.get('/ecommerce-customers', isUserAllowed, function (req, res) {
            res.locals = { title: 'Customers' };
            res.render('Ecommerce/ecommerce-customers');
      });
      app.get('/ecommerce-cart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cart' };
            res.render('Ecommerce/ecommerce-cart');
      });
      app.get('/ecommerce-checkout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Checkout' };
            res.render('Ecommerce/ecommerce-checkout');
      });
      app.get('/ecommerce-shops', isUserAllowed, function (req, res) {
            res.locals = { title: 'Shops' };
            res.render('Ecommerce/ecommerce-shops');
      });
      app.get('/ecommerce-add-product', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Product' };
            res.render('Ecommerce/ecommerce-add-product');
      });

      // Email
      app.get('/email-inbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Inbox' };
            res.render('Email/email-inbox');
      });
      app.get('/email-read', isUserAllowed, function (req, res) {
            res.locals = { title: 'Email Read' };
            res.render('Email/email-read');
      });

      // Config
      // subsidiaries
      app.get('/config-subsidiaries', isUserAllowed, function (req, res) {
            res.locals = { title: 'Subsidiaries' };
            // var subsidiaries = genSubsidiaries(req);
            // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
            genSubsidiaries(req.body)
                  .then((subsidiaries) => {
                        console.log('subsidiaries: ' + subsidiaries.length);
                        res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                        // var result = procesainvoices(invoices)
                        // console.log(JSON.stringify(result));
                        // res.locals.invoices = result
                        // res.render('Invoice/invoices-list.ejs', { "invoices": result });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });
      });

      app.get('/config-add-subsidiaries', isUserAllowed, function (req, res) {
            res.locals = { title: 'Agrega Subsidiaries' };
            res.render('Configurations/config-add-subsidiaries', { "regimen": regimens });
      });
      app.post('/config-add-subsidiaries/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Subsidiaries' };
            setSubsidiaries(req)
                  .then((subsidiaries) => {
                        console.log("ok")
                        // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                        genSubsidiaries(req.body)
                              .then((subsidiaries) => {
                                    //      res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                                    // res.redirect(302,'/config-subsidiaries');
                                    var respuesta ='ok'
                                    res.send({"respuesta":respuesta});
                              })
                              .catch((err) => {
                                    console.log(JSON.stringify('genSubsidiaries'+err));
                              });
                  })
                  .catch((err) => {
                        console.log("error al guardar subsidiaries");
                  });
            console.log(JSON.stringify(req.body));

      });
      app.get('/config-update-subsidiaries', isUserAllowed, function (req, res) {
            // req
            console.log("entre:" + req.query.id)
            var subid = req.query.id
            const mysub = mongoose.model('subsidiaries', subsidiaries.subsidiary);
            // const nsub = new mysub(req.body)
            getSubsidiary(subid)
                  .then((subsidiary) => {
                        console.log(subsidiary);
                        res.locals = { title: 'Edit Subsidiaries' };
                        console.log("subsidiaria a editar:"+JSON.stringify(subsidiary));
                        res.render('Configurations/config-update-subsidiaries', { "subsidiary": subsidiary, "regimen": regimens });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('no encontrada subsidiary'));
                  });

            // res.locals = { title: 'Agrega Subsidiaries' };
            // res.render('Configurations/config-update-subsidiaries');
      });
      app.post('/config-update-subsidiaries/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Subsidiaries' };
            updateSubsidiary(req)
                  .then((subsidiaries) => {
                        console.log("update ok")
                        // res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                  })
                  .catch((err) => {
                        console.log("error al guardar subsidiaries");
                  });
            console.log(JSON.stringify(req.body));
            genSubsidiaries(req.body)
                  .then((subsidiaries) => {
                        res.render('Configurations/config-subsidiaries', { "subsidiaries": subsidiaries });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });
      });
      // Users
      app.get('/config-users', isUserAllowed, function (req, res) {
            res.locals = { title: 'Usuarios' };
            getUsers(req.body)
                  .then((users) => {
                        console.log('getusers: ' + users.length+ ' '+JSON.stringify(users));
                        res.render('Configurations/config-users', { "users": users });
                        // var result = procesainvoices(invoices)
                        // console.log(JSON.stringify(result));
                        // res.locals.invoices = result
                        // res.render('Invoice/invoices-list.ejs', { "invoices": result });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });
      });
      app.get('/config-add-users', isUserAllowed, function (req, res) {
            res.locals = { title: 'Agrega Usuario' };
            genSubsidiaries(req.body)
                  .then((subsidiaries) => {
                        res.render('Configurations/config-add-users', { "permisos": permisos, "subsidiaries": subsidiaries });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });
            // res.render('Configurations/config-add-users', { "permisos": permisos,  });
      });
      app.post('/config-add-users/', isUserAllowed, function (req, res) {
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
      app.get('/config-update-users', isUserAllowed, function (req, res) {
            // req
            console.log("entre:" + req.query.id)
            var subid = req.query.id
            const mysub = mongoose.model('users', subsidiaries.subsidiary);
            // const nsub = new mysub(req.body)
            getUser(subid)
                  .then((usrs) => {
                        console.log(usrs);
                        res.locals = { title: 'Edit Users' };
                        console.log("users a editar:"+JSON.stringify(usrs));
                        res.render('Configurations/config-update-users', { "users": usrs, "permisos": permisos });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('no encontrada subsidiary'));
                  });

            // res.locals = { title: 'Agrega Subsidiaries' };
            // res.render('Configurations/config-update-subsidiaries');
      });
      app.post('/config-update-users/', isUserAllowed, function (req, res) {
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
      // programs  ?
      app.get('/config-programs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Configurarion Programs' };
            res.render('Configurations/config-programs');
      });

      // Invoice
      app.get('/invoices-list', isUserAllowed, function (req, res) {
            getCfdis(req.body)
                  .then((invoices) => {
                        // console.log('pagos: '+ invoices.length);
                        var result = procesainvoices(invoices)
                        // console.log(JSON.stringify(result));
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });
            res.locals = { title: 'Invoice List' };

            getInvoices(req) // Aquí llamas a la función getInvoices y obtienes una promesa
                  .then((invoices) => {
                        // console.log(JSON.stringify(invoices));
                        // res.locals = { title: 'Invoice List' };
                        res.render('Invoice/invoices-list', { "invoices": [{}] });
                        // var employees = genEmployess(req);
                        // res.render('Invoice/invoices-list', {"employees":employees } );
                  })
                  .catch((err) => {
                        // console.error(err); // Aquí manejas los posibles errores
                        console.log(JSON.stringify('vacio'));
                        res.render('Invoice/invoices-list', { "invoices": [{}] });
                  });

      });
      // consulta
      app.post('/invoices-list', isUserAllowed, function (req, res) {
            // console.log(request.body.user.name);
            res.locals = { title: 'Invoice List' };
            getCfdis(req.body)
                  .then((invoices) => {
                        console.log('cfdis: ' + invoices.length);
                        var result = procesainvoices(invoices)
                        console.log(JSON.stringify(result));
                        res.locals.invoices = result
                        res.render('Invoice/invoices-list.ejs', { "invoices": result });
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });

            // res.locals = { title: 'Invoice List' };
            // getInvoices(req) // Aquí llamas a la función getInvoices y obtienes una promesa
            //       .then((invoices) => {
            //             // console.log(invoices.length);
            //             // res.locals.invoices=invoices
            //             // res.render('Invoice/invoices-list.ejs', {"invoices": invoices});

            //       })
            //       .catch((err) => {
            //             // console.error(err); // Aquí manejas los posibles errores
            //             console.log(JSON.stringify('vacio'));
            //             res.render('Invoice/invoices-list', { "invoices": [{}] });
            //       });

      });
      app.get('/invoices-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoice Detail' };
            res.render('Invoice/invoices-detail');
      });

      // Reports
      app.get('/reports-nom-gravex', isUserAllowed, function (req, res) {
            // res.locals = { title: 'Nóminas Gravado y Excento' };
            // res.render('Reports/reports-nom-gravex');
            //  ***
            res.locals = { title: 'Nóminas Gravado y Excento' };
            getInvoicesPayRol(req) // Aquí llamas a la función getInvoices y obtienes una promesa
                  .then((payrol) => {
                        console.log(JSON.stringify(payrol));
                        res.render('Reports/reports-nom-gravex', { "payrol": payrol });
                        // var employees = genEmployess(req);
                        // res.render('Invoice/invoices-list', {"employees":employees } );
                  })
                  .catch((err) => {
                        // console.error(err); // Aquí manejas los posibles errores
                        console.log(JSON.stringify('vacio'));
                        res.render('Invoice/invoices-list', { "invoices": [{}] });
                  });

      });
      app.get('/reports-prov-iva', isUserAllowed, function (req, res) {
            // res.locals = { title: 'Nóminas Gravado y Excento' };
            // res.render('Reports/reports-nom-gravex');
            //  ***
            res.locals = { title: 'Detalle de Pagos' };
            req.body.tipo = 'pagos'
            getVendorTax(req) // Aquí llamas a la función getInvoices y obtienes una promesa
                  .then((invoices) => {
                        console.log(JSON.stringify(invoices));
                        res.render('Reports/reports-prov-iva', { "invoices": invoices });
                  })
                  .catch((err) => {
                        // console.error(err); // Aquí manejas los posibles errores
                        console.log(JSON.stringify('vacio'));
                        res.render('Reports/invoices-list', { "invoices": [{}] });
                  });

      });
      // consulta
      app.post('/reports-prov-iva', isUserAllowed, function (req, res) {
            // console.log(request.body.user.name);
            res.locals = { title: 'Detalle de Pagos ' };
            // req.body.tipo = 'pagos'
            getVendorTax(req.body)
                  .then((invoices) => {
                        console.log('cfdis: ' + invoices.length);
                        payments.getPaymentsDatalail(invoices)
                              .then((result) => {
                                    console.log('cfdis: ' + invoices.length);

                                    // var result = payments.getPaymentsDatalail(invoices, '', '', '');
                                    console.log(' prov-iva result: ' + result.length);
                                    console.log(JSON.stringify(result));
                                    res.locals.invoices = result
                                    res.render('Reports/reports-prov-iva', { "invoices": result });
                              })
                              .catch((err) => {
                                    console.log(JSON.stringify('pagosvacioDRresult'));
                              });
                        // var result = payments.getPaymentsDatalail(invoices, '', '', '');
                        // console.log(' prov-iva result: ' + result.length);
                        // console.log(JSON.stringify(result));
                        // res.locals.invoices = result
                        // res.render('Reports/reports-prov-iva', {"invoices": result});
                  })
                  .catch((err) => {
                        console.log(JSON.stringify('pagosvacio'));
                  });

      });
      app.get('/reports-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'User List' };
            res.render('Reports/reports-list');
      });
      app.get('/reports-profile', isUserAllowed, function (req, res) {
            res.locals = { title: 'Profile' };
            res.render('Reports/reports-profile');
      });

      // // Contacts
      // app.get('/contacts-grid', isUserAllowed, function (req, res) {
      //       res.locals = { title: 'User Grid' };
      //       res.render('Contacts/contacts-grid');
      // });
      // app.get('/contacts-list', isUserAllowed, function (req, res) {
      //       res.locals = { title: 'User List' };
      //       res.render('Contacts/contacts-list');
      // });
      // app.get('/contacts-profile', isUserAllowed, function (req, res) {
      //       res.locals = { title: 'Profile' };
      //       res.render('Contacts/contacts-profile');
      // });

      //DONWLOAD CFDI
      app.get('/download', isUserAllowed, function (req, res) {
            const testFolder = 'C:\\data\\2022\\12\\';
            var to_zip = fs.readdirSync(testFolder)
            const zp = new admz();
            // this is the main part of our work!
            // here for loop check counts and passes each and every
            // file of our folder "upload_data"
            // and convert each of them to a zip!
            for (let k = 0; k < to_zip.length; k++) {
                  zp.addLocalFile(testFolder + to_zip[k])
            }

            // here we assigned the name to our downloaded file!
            const file_after_download = 'downloaded_file.zip';

            // toBuffer() is used to read the data and save it
            // for downloading process!
            const data = zp.toBuffer();


            // this is the code for downloading!
            // here we have to specify 3 things:
            // 1. type of content that we are downloading
            // 2. name of file to be downloaded
            // 3. length or size of the downloaded file!

            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${file_after_download}`);
            res.set('Content-Length', data.length);
            res.send(data);
      });

      // Pages
      app.get('/pages-starter', isUserAllowed, function (req, res) {
            res.locals = { title: 'Starter Page' };
            res.render('Pages/pages-starter');
      });
      app.get('/pages-timeline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Timeline' };
            res.render('Pages/pages-timeline');
      });
      app.get('/pages-faqs', isUserAllowed, function (req, res) {
            res.locals = { title: 'FAQs' };
            res.render('Pages/pages-faqs');
      });
      app.get('/pages-pricing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Pricing' };
            res.render('Pages/pages-pricing');
      });

      // UI
      app.get('/ui-alerts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alerts' };
            res.render('Ui/ui-alerts');
      });
      app.get('/ui-buttons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buttons' };
            res.render('Ui/ui-buttons');
      });
      app.get('/ui-cards', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cards' };
            res.render('Ui/ui-cards');
      });
      app.get('/ui-carousel', isUserAllowed, function (req, res) {
            res.locals = { title: 'Carousel' };
            res.render('Ui/ui-carousel');
      });
      app.get('/ui-dropdowns', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dropdowns' };
            res.render('Ui/ui-dropdowns');
      });
      app.get('/ui-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Grid' };
            res.render('Ui/ui-grid');
      });
      app.get('/ui-images', isUserAllowed, function (req, res) {
            res.locals = { title: 'Images' };
            res.render('Ui/ui-images');
      });
      app.get('/ui-lightbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lightbox' };
            res.render('Ui/ui-lightbox');
      });
      app.get('/ui-modals', isUserAllowed, function (req, res) {
            res.locals = { title: 'Modals' };
            res.render('Ui/ui-modals');
      });
      app.get('/ui-rangeslider', isUserAllowed, function (req, res) {
            res.locals = { title: 'Range Slider' };
            res.render('Ui/ui-rangeslider');
      });
      app.get('/ui-session-timeout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Session Timeout' };
            res.render('Ui/ui-session-timeout');
      });
      app.get('/ui-progressbars', isUserAllowed, function (req, res) {
            res.locals = { title: 'Progress Bars' };
            res.render('Ui/ui-progressbars');
      });
      app.get('/ui-sweet-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sweet Alert' };
            res.render('Ui/ui-sweet-alert');
      });
      app.get('/ui-tabs-accordions', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tabs & Accordions' };
            res.render('Ui/ui-tabs-accordions');
      });
      app.get('/ui-typography', isUserAllowed, function (req, res) {
            res.locals = { title: 'Typography' };
            res.render('Ui/ui-typography');
      });
      app.get('/ui-video', isUserAllowed, function (req, res) {
            res.locals = { title: 'Video' };
            res.render('Ui/ui-video');
      });
      app.get('/ui-general', isUserAllowed, function (req, res) {
            res.locals = { title: 'General' };
            res.render('Ui/ui-general');
      });
      app.get('/ui-colors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colors' };
            res.render('Ui/ui-colors');
      });
      app.get('/ui-rating', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rating' };
            res.render('Ui/ui-rating');
      });
      app.get('/ui-notifications', isUserAllowed, function (req, res) {
            res.locals = { title: 'Notifications' };
            res.render('Ui/ui-notifications');
      });


      // Forms
      app.get('/form-elements', isUserAllowed, function (req, res) {
            res.locals = { title: 'Basic Elements' };
            res.render('Form/form-elements');
      });
      app.get('/form-validation', isUserAllowed, function (req, res) {
            res.locals = { title: 'Validation' };
            res.render('Form/form-validation');
      });
      app.get('/form-advanced', isUserAllowed, function (req, res) {
            res.locals = { title: 'Advanced Plugins' };
            res.render('Form/form-advanced');
      });
      app.get('/form-editors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Editors' };
            res.render('Form/form-editors');
      });
      app.get('/form-uploads', isUserAllowed, function (req, res) {
            res.locals = { title: 'File Uploads' };
            res.render('Form/form-uploads');
      });
      app.get('/form-xeditable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Xeditable' };
            res.render('Form/form-xeditable');
      });
      app.get('/form-repeater', isUserAllowed, function (req, res) {
            res.locals = { title: 'Repeater' };
            res.render('Form/form-repeater');
      });
      app.get('/form-wizard', isUserAllowed, function (req, res) {
            res.locals = { title: 'Wizard' };
            res.render('Form/form-wizard');
      });
      app.get('/form-mask', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Mask' };
            res.render('Form/form-mask');
      });

      // Tables
      app.get('/tables-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Bootstrap Basic' };
            res.render('Tables/tables-basic');
      });
      app.get('/tables-datatable', isUserAllowed, async function (req, res) {
            var response;
            console.log("svoy a solicitar a data table")
            var nt = genToken(req);
            console.log('resulttoken:' + nt);
            // try {
            //       response = await axios.get(`http://localhost:8000/tables-datatable-api`);
            //       console.log(response);
            // } catch (error) {
            //       console.error(error);
            // }

            res.locals = { title: 'Datatables' };
            var employees = genEmployess(req);
            // console.log(response);
            res.render('Tables/tables-datatable', { "employees": employees });
      });
      //para web api
      // app.get('/tables-datatable-api', isUserAllowed, function (req, res) {
      // app.get('/tables-datatable-api', function (req, res) {
      //       console.log("entre a api");
      //       var employees = [{ Name: "Airi Satou", Positiion: "Accountant", Office: "Tokyo", Age: 33, StartDate: "28/11/2008", Salary: "$162,700" },
      //       { Name: "Angelica Ramo_cs", Positiion: "Chief Executive Officer (CEO)", Office: "London", Age: 47, StartDate: "09/10/2009", Salary: "$1,200,000" },
      //       { Name: "Ashton Cox", Positiion: "Junior Technical Author", Office: "San Francisco", Age: 66, StartDate: "12/01/2009", Salary: "$86,000" },
      //       { Name: "Bradley Greer", Positiion: "Software Engineer", Office: "London", Age: 41, StartDate: "13/10/2012", Salary: "$132,000" },
      //       { Name: "Brenden Wagner", Positiion: "Software Engineer", Office: "San Francisco", Age: 28, StartDate: "07/06/2011", Salary: "$206,850" },
      //       { Name: "Brielle Williamson", Positiion: "Integration Specialist", Office: "New York", Age: 61, StartDate: "02/12/2012", Salary: "$372,000" },
      //       { Name: "Bruno Nash", Positiion: "Software Engineer", Office: "London", Age: 38, StartDate: "03/05/2011", Salary: "$163,500" },
      //       { Name: "Caesar Vance", Positiion: "Pre-Sales Support", Office: "New York", Age: 21, StartDate: "12/12/2011", Salary: "$106,450" },
      //       { Name: "Cara Stevens", Positiion: "Sales Assistant", Office: "New York", Age: 46, StartDate: "06/12/2011", Salary: "$145,600" },
      //       { Name: "Cedric Kelly", Positiion: "Senior Javascript Developer", Office: "Edinburgh", Age: 22, StartDate: "29/03/2012", Salary: "$433,060" },
      //       { Name: "Charde Marshall", Positiion: "Regional Director", Office: "San Francisco", Age: 36, StartDate: "16/10/2008", Salary: "$470,600" },
      //       { Name: "Colleen Hurst", Positiion: "Javascript Developer", Office: "San Francisco", Age: 39, StartDate: "15/09/2009", Salary: "$205,500" },
      //       { Name: "Dai Rios", Positiion: "Personnel Lead", Office: "Edinburgh", Age: 35, StartDate: "26/09/2012", Salary: "$217,500" },
      //       { Name: "Donna Snider", Positiion: "Customer Support", Office: "New York", Age: 27, StartDate: "25/01/2011", Salary: "$112,000" },
      //       { Name: "Doris Wilder", Positiion: "Sales Assistant", Office: "Sidney", Age: 23, StartDate: "20/09/2010", Salary: "$85,600" },
      //       { Name: "Finn Camacho", Positiion: "Support Engineer", Office: "San Francisco", Age: 47, StartDate: "07/07/2009", Salary: "$87,500" },
      //       { Name: "Fiona Green", Positiion: "Chief Operating Officer (COO)", Office: "San Francisco", Age: 48, StartDate: "11/03/2010", Salary: "$850,000" },
      //       { Name: "Garrett Winters", Positiion: "Accountant", Office: "Tokyo", Age: 63, StartDate: "25/07/2011", Salary: "$170,750" },
      //       { Name: "Gavin Cortez", Positiion: "Team Leader", Office: "San Francisco", Age: 22, StartDate: "26/10/2008", Salary: "$235,500" },
      //       { Name: "Gavin Joyce", Positiion: "Developer", Office: "Edinburgh", Age: 42, StartDate: "22/12/2010", Salary: "$92,575" },
      //       { Name: "Gloria Little", Positiion: "Systems Administrator", Office: "New York", Age: 59, StartDate: "10/04/2009", Salary: "$237,500" },
      //       { Name: "Haley Kennedy", Positiion: "Senior Marketing Designer", Office: "London", Age: 43, StartDate: "18/12/2012", Salary: "$313,500" },
      //       { Name: "Hermione Butler", Positiion: "Regional Director", Office: "London", Age: 47, StartDate: "21/03/2011", Salary: "$356,250" },
      //       { Name: "Herrod Chandler", Positiion: "Sales Assistant", Office: "San Francisco", Age: 59, StartDate: "06/08/2012", Salary: "$137,500" },
      //       { Name: "Hope Fuentes", Positiion: "Secretary", Office: "San Francisco", Age: 41, StartDate: "12/02/2010", Salary: "$109,850" },
      //       { Name: "Howard Hatfield", Positiion: "Office Manager", Office: "San Francisco", Age: 51, StartDate: "16/12/2008", Salary: "$164,500" },
      //       { Name: "Jackson Bradshaw", Positiion: "Director", Office: "New York", Age: 65, StartDate: "26/09/2008", Salary: "$645,750" },
      //       { Name: "Jena Gaines", Positiion: "Office Manager", Office: "London", Age: 30, StartDate: "19/12/2008", Salary: "$90,560" },
      //       { Name: "Jenette Caldwell", Positiion: "Development Lead", Office: "New York", Age: 30, StartDate: "03/09/2011", Salary: "$345,000" },
      //       { Name: "Jennifer Acosta", Positiion: "Junior Javascript Developer", Office: "Edinburgh", Age: 43, StartDate: "01/02/2013", Salary: "$75,650" },
      //       { Name: "Jennifer Chang", Positiion: "Regional Director", Office: "Singapore", Age: 28, StartDate: "14/11/2010", Salary: "$357,650" },
      //       { Name: "Jonas Alexander", Positiion: "Developer", Office: "San Francisco", Age: 30, StartDate: "14/07/2010", Salary: "$86,500" },
      //       { Name: "Lael Greer", Positiion: "Systems Administrator", Office: "London", Age: 21, StartDate: "27/02/2009", Salary: "$103,500" },
      //       { Name: "Martena Mccray", Positiion: "Post-Sales support", Office: "Edinburgh", Age: 46, StartDate: "09/03/2011", Salary: "$324,050" },
      //       { Name: "Michael Bruce", Positiion: "Javascript Developer", Office: "Singapore", Age: 29, StartDate: "27/06/2011", Salary: "$183,000" },
      //       { Name: "Michael Silva", Positiion: "Marketing Designer", Office: "London", Age: 66, StartDate: "27/11/2012", Salary: "$198,500" },
      //       { Name: "Michelle House", Positiion: "Integration Specialist", Office: "Sidney", Age: 37, StartDate: "02/06/2011", Salary: "$95,400" },
      //       { Name: "Olivia Liang", Positiion: "Support Engineer", Office: "Singapore", Age: 64, StartDate: "03/02/2011", Salary: "$234,500" },
      //       { Name: "Paul Byrd", Positiion: "Chief Financial Officer (CFO)", Office: "New York", Age: 64, StartDate: "09/06/2010", Salary: "$725,000" },
      //       { Name: "Prescott Bartlett", Positiion: "Technical Author", Office: "London", Age: 27, StartDate: "07/05/2011", Salary: "$145,000" },
      //       { Name: "Quinn Flynn", Positiion: "Support Lead", Office: "Edinburgh", Age: 22, StartDate: "03/03/2013", Salary: "$342,000" },
      //       { Name: "Rhona Davidson", Positiion: "Integration Specialist", Office: "Tokyo", Age: 55, StartDate: "14/10/2010", Salary: "$327,900" },
      //       { Name: "Sakura Yamamoto", Positiion: "Support Engineer", Office: "Tokyo", Age: 37, StartDate: "19/08/2009", Salary: "$139,575" },
      //       { Name: "Serge Baldwin", Positiion: "Data Coordinator", Office: "Singapore", Age: 64, StartDate: "09/04/2012", Salary: "$138,575" },
      //       { Name: "Shad Decker", Positiion: "Regional Director", Office: "Edinburgh", Age: 51, StartDate: "13/11/2008", Salary: "$183,000" },
      //       { Name: "Shou Itou", Positiion: "Regional Marketing", Office: "Tokyo", Age: 20, StartDate: "14/08/2011", Salary: "$163,000" },
      //       { Name: "Sonya Frost", Positiion: "Software Engineer", Office: "Edinburgh", Age: 23, StartDate: "13/12/2008", Salary: "$103,600" },
      //       { Name: "Suki Burks", Positiion: "Developer", Office: "London", Age: 53, StartDate: "22/10/2009", Salary: "$114,500" },
      //       { Name: "Tatyana Fitzpatrick", Positiion: "Regional Director", Office: "London", Age: 19, StartDate: "17/03/2010", Salary: "$385,750" },
      //       { Name: "Thor Walton", Positiion: "Developer", Office: "New York", Age: 61, StartDate: "11/08/2013", Salary: "$98,540" },
      //       { Name: "Tiger Nixon", Positiion: "System Architect", Office: "Edinburgh", Age: 61, StartDate: "25/04/2011", Salary: "$320,800" },
      //       { Name: "Timothy Mooney", Positiion: "Office Manager", Office: "London", Age: 37, StartDate: "11/12/2008", Salary: "$136,200" },
      //       { Name: "Unity Butler", Positiion: "Marketing Designer", Office: "San Francisco", Age: 47, StartDate: "09/12/2009", Salary: "$85,675" },
      //       { Name: "Vivian Harrell", Positiion: "Financial Controller", Office: "San Francisco", Age: 62, StartDate: "14/02/2009", Salary: "$452,500" },
      //       { Name: "Yuri Berry", Positiion: "Chief Marketing Officer (CMO)", Office: "New York", Age: 40, StartDate: "25/06/2009", Salary: "$675,000" },
      //       { Name: "Zenaida Frank", Positiion: "Software Engineer", Office: "New York", Age: 63, StartDate: "04/01/2010", Salary: "$125,250" },
      //       { Name: "Zorita Serrano", Positiion: "Software Engineer", Office: "San Francisco", Age: 56, StartDate: "01/06/2012", Salary: "$115,000" }];

      //       res.json({ employes: employees });
      // });

      app.get('/tables-responsive', isUserAllowed, function (req, res) {
            res.locals = { title: 'Responsive' };
            res.render('Tables/tables-responsive');
      });
      app.get('/tables-editable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Editable' };
            res.render('Tables/tables-editable');
      });

      // Charts
      app.get('/charts-apex', isUserAllowed, function (req, res) {
            res.locals = { title: 'Apex' };
            res.render('Charts/charts-apex');
      });
      app.get('/charts-chartjs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chartjs' };
            res.render('Charts/charts-chartjs');
      });
      app.get('/charts-flot', isUserAllowed, function (req, res) {
            res.locals = { title: 'Flot' };
            res.render('Charts/charts-flot');
      });
      app.get('/charts-knob', isUserAllowed, function (req, res) {
            res.locals = { title: 'Jquery Knob' };
            res.render('Charts/charts-knob');
      });
      app.get('/charts-sparkline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sparkline' };
            res.render('Charts/charts-sparkline');
      });

      // Icons
      app.get('/icons-unicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Unicons' };
            res.render('Icons/icons-unicons');
      });
      app.get('/icons-boxicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxicons' };
            res.render('Icons/icons-boxicons');
      });
      app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
            res.locals = { title: 'Material Design' };
            res.render('Icons/icons-materialdesign');
      });
      app.get('/icons-dripicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dripicons' };
            res.render('Icons/icons-dripicons');
      });
      app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
            res.locals = { title: 'Font Awesome' };
            res.render('Icons/icons-fontawesome');
      });

      // Maps
      app.get('/maps-google', isUserAllowed, function (req, res) {
            res.locals = { title: 'Google' };
            res.render('Maps/maps-google');
      });
      app.get('/maps-vector', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vector' };
            res.render('Maps/maps-vector');
      });
      app.get('/maps-leaflet', isUserAllowed, function (req, res) {
            res.locals = { title: 'Leaflet' };
            res.render('Maps/maps-leaflet');
      });

}