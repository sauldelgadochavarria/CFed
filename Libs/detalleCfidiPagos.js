var config = require('../config');
var mongoose = require('mongoose');
var cfdiSch = require('../models/cfdi3')
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);
const ingreso = mongoose.model('Kitten', cfdiSch.ingreso);

// var db = mongoose.connection;

async function getPaymentsDatalail(lpagos, ingreso, rfcReceptor, tipo) {
    var lout = [];
    var conti = 0;
    console.log(lpagos.length);
    // lpagos.forEach(cp => {
    for (j = 0; j < lpagos.length; j++) {
        var cp = lpagos[j];
        //Generales
        var VersionCfdi = cp.Comprobante.Version;
        var DomicilioFiscalReceptor = cp.Comprobante.Receptor.DomicilioFiscalReceptor;
        var NombreReceptor = cp.Comprobante.Receptor.Nombre;
        var RegimenFiscalReceptor = cp.Comprobante.Receptor.RegimenFiscalReceptor;
        var RfcReceptor = cp.Comprobante.Receptor.Rfc;
        var UsoCFDI = cp.Comprobante.Receptor.UsoCFDI;
        var fechaPago = cp.Comprobante.Fecha;
        var LugarExpedicion = cp.Comprobante.LugarExpedicion;
        var Serie = cp.Comprobante.Serie;
        var NombreEmisor = cp.Comprobante.Emisor.Nombre;
        var RegimenFiscalEmisor = cp.Comprobante.Emisor.RegimenFiscal;
        var RfcEmisor = cp.Comprobante.Emisor.Rfc;
        var UUID = cp._id;
        var tipoComprobante = cp.Comprobante.TipoDeComprobante;

        var vp = "", id_Dr = "";
        console.log(conti + 1 + '-' + '_id:' + cp._id + ' VersionCfdi:' + VersionCfdi);
        var existeP10 = cp.Comprobante.Complemento.hasOwnProperty("pago10Pagos");
        var existeP20 = cp.Comprobante.Complemento.hasOwnProperty("pago20Pagos")
        try {
            if (existeP10 && cp.Comprobante.Complemento.pago10Pagos.Version !== undefined) {
                VersionPago = cp.Comprobante.Complemento.pago10Pagos.Version
                // console.log("cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado.length;" + cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado.length)
                for (i = 0; i < cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado.length; i++) {
                    var obj = {}
                    obj.VersionCfdi = VersionCfdi;
                    obj.DomicilioFiscalReceptor = DomicilioFiscalReceptor;
                    obj.NombreReceptor = NombreReceptor;
                    obj.RegimenFiscalReceptor = RegimenFiscalReceptor;
                    obj.RfcReceptor = RfcReceptor;
                    obj.UsoCFDI = UsoCFDI;
                    obj.fechaPago = fechaPago;
                    obj.LugarExpedicion = LugarExpedicion;
                    obj.Serie = Serie;
                    obj.NombreEmisor = NombreEmisor;
                    obj.RegimenFiscalEmisor = RegimenFiscalEmisor;
                    obj.RfcEmisor = RfcEmisor;
                    obj.UUID = UUID;
                    obj.tipoComprobante = tipoComprobante;
                    obj.versionPago = VersionPago;

                    //detalle

                    obj.id_DrIngreso = cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[i].IdDocumento;
                    obj.impPagado = cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[i].ImpPagad;
                    obj.saldoAnterior = cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[i].ImpSaldoAnt;
                    obj.monedaDr = cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[i].MonedaDR;
                    obj.parcialidad = cp.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[i].NumParcialidad;

                    // obj.seriePago= pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].Serie;
                    obj.seriePago = '';
                    obj.baseDR = 0;
                    obj.ImporteDR = 0;
                    obj.ImpuestoDR = "";
                    obj.TasaOCuotaDR = "";
                    obj.TipoFactorDR = "";
                    // obj.baseDR = pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.BaseDR
                    // obj.ImporteDR = pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.ImporteDR
                    // obj.ImpuestoDR = pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.ImpuestoDR
                    // obj.TasaOCuotaDR = pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.TasaOCuotaDR
                    // obj.TipoFactorDR = pago.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.TipoFactorDR

                    //************************************************************************************************
                    console.log('entrando a get ingreso1:' + obj.id_DrIngreso);
                    // getIgresoData(obj.id_DrIngreso)
                    //     .then((factura) => {
                    //         if (factura) {
                    //             obj.MetodoPagoIngreso = factura.MetodoPagoIngreso;
                    //             obj.ImporteTrasladoIngreso = factura.ImporteTrasladoIngreso;
                    //             obj.ImpuestoTrasladoIngreso = factura.ImpuestoTrasladoIngreso;
                    //             obj.TasaOCuotaTrasladoIngreso = factura.TasaOCuotaTrasladoIngreso;
                    //             obj.TipoFactorTrasladoIngreso = factura.TipoFactorTrasladoIngreso;
                    //             obj.ImporteRetencionIngreso = factura.ImporteRetencionIngreso;
                    //             obj.ImpuestoRetencionIngreso = factura.ImpuestoRetencionIngreso;
                    //             obj.TotalComprobanteIngreso = factura.TotalComprobanteIngreso;
                    //             obj.TasaOCuotaRetencionIngreso = factura.TasaOCuotaRetencionIngreso;
                    //             obj.TipoFactorRetencionIngreso = factura.TipoFactorRetencionIngreso;
                    //         } else {
                    //             obj.MetodoPagoIngreso = 'ND'
                    //             obj.ImporteTrasladoIngreso = 0;
                    //             obj.ImpuestoTrasladoIngreso = 'ND';
                    //             obj.TasaOCuotaTrasladoIngreso = 'ND';
                    //             obj.TipoFactorTrasladoIngreso = 'ND';
                    //             obj.ImporteRetencionIngreso = 0;
                    //             obj.ImpuestoRetencionIngreso = 'ND';
                    //             obj.TotalComprobanteIngreso = 0;
                    //             obj.TasaOCuotaRetencionIngreso = 'ND';
                    //             obj.TipoFactorRetencionIngreso = 'ND';
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.log(JSON.stringify(err + ' sin ingres 1->' + obj.id_DrIngreso));
                    //     });
                    //***
                    var factura = await getIgresoData(obj.id_DrIngreso);
                    if ((factura)) {
                        obj.FechaIngreso = factura.FechaIngreso;
                        obj.MetodoPagoIngreso = factura.MetodoPagoIngreso;
                        obj.ImporteTrasladoIngreso = factura.ImporteTrasladoIngreso;
                        obj.ImpuestoTrasladoIngreso = factura.ImpuestoTrasladoIngreso;
                        obj.TasaOCuotaTrasladoIngreso = factura.TasaOCuotaTrasladoIngreso;
                        obj.TipoFactorTrasladoIngreso = factura.TipoFactorTrasladoIngreso;
                        obj.ImporteRetencionIngreso = factura.ImporteRetencionIngreso;
                        obj.ImpuestoRetencionIngreso = factura.ImpuestoRetencionIngreso;
                        obj.TasaOCuotaRetencionIngreso=factura.TasaOCuotaRetencionIngreso;
                        obj.TipoFactorRetencionIngreso=factura.TipoFactorRetencionIngreso;
                        obj.TotalComprobanteIngreso = factura.TotalComprobanteIngreso;
                    } else {
                        obj.FechaIngreso = new Date('1990-01-01');
                        obj.MetodoPagoIngreso = 'ND'
                        obj.ImporteTrasladoIngreso = 0;
                        obj.ImpuestoTrasladoIngreso = 'ND';
                        obj.TasaOCuotaTrasladoIngreso = 'ND';
                        obj.TipoFactorTrasladoIngreso = 'ND';
                        obj.ImporteRetencionIngreso = 0;
                        obj.ImpuestoRetencionIngreso = 'ND';
                        obj.TasaOCuotaRetencionIngreso="";
                        obj.TipoFactorRetencionIngreso="";
                        obj.TotalComprobanteIngreso = 0;

                    }
                    console.log(' ingreso1 lafactura es TrasladoDRImporte:'+ obj.TrasladoDRImporte)
                    lout.push(obj);
                    // console.log(lout.length+ 'id_dr:'+ obj.id_Dr);
                    console.log('lout prcs1:'+lout.length);
                }

                // id_Dr =pago.Comprobante.Complemento.pago10Pagos.pago10Pago.pago10DoctoRelacionado[0].IdDocumento


            } else {
                console.log('else p1');
            }
        } catch (ex) { console.log(UUID + ' vesrion:' + VersionCfdi + ' ok3:' + ex) }
        try {
            if ((existeP20) && cp.Comprobante.Complemento.pago20Pagos.Version !== undefined) {

                vp = cp.Comprobante.Complemento.pago20Pagos.Version;
                // console.log(" cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado.length:" + cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado.length)
                for (i = 0; i < cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado.length; i++) {
                    var obj = {}
                    obj.VersionCfdi = VersionCfdi;
                    obj.DomicilioFiscalReceptor = DomicilioFiscalReceptor;
                    obj.NombreReceptor = NombreReceptor;
                    obj.RegimenFiscalReceptor = RegimenFiscalReceptor;
                    obj.RfcReceptor = RfcReceptor;
                    obj.UsoCFDI = UsoCFDI;
                    obj.fechaPago = fechaPago;
                    obj.LugarExpedicion = LugarExpedicion;
                    obj.Serie = Serie;
                    obj.NombreEmisor = NombreEmisor;
                    obj.RegimenFiscalEmisor = RegimenFiscalEmisor;
                    obj.RfcEmisor = RfcEmisor;
                    obj.UUID = UUID;
                    obj.tipoComprobante = tipoComprobante;
                    obj.versionPago = vp;

                    //detalle
                    obj.impPagado = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].ImpPagado;
                    obj.saldoAnterior = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].ImpSaldoAnt;
                    obj.ImpSaldoInsoluto = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].ImpSaldoInsoluto;
                    obj.monedaDr = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].MonedaDR;
                    obj.parcialidad = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].NumParcialidad;
                    obj.seriePago = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].Serie;
                    obj.impPagado = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].ImpPagado;
                    if (cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].hasOwnProperty("pago20TrasladosDR")) {
                        obj.baseDR = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.BaseDR;
                        obj.ImporteDR = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.ImporteDR;
                        obj.ImpuestoDR = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.ImpuestoDR;
                        obj.TasaOCuotaDR = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.TasaOCuotaDR;
                        obj.TipoFactorDR = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].pago20ImpuestosDR.pago20TrasladosDR.pago20TrasladoDR.TipoFactorDR;
                    }
                    else {
                        obj.baseDR = 0;
                        obj.ImporteDR = 0;
                        obj.ImpuestoDR = "";
                        obj.TasaOCuotaDR = "";
                        obj.TipoFactorDR = "";
                    }
                                        //   "Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado.IdDocumento"
                    obj.id_DrIngreso = cp.Comprobante.Complemento.pago20Pagos.pago20Pago.pago20DoctoRelacionado[i].IdDocumento;

                    // console.log('entrando a get ingreso2:'+obj.id_DrIngreso);
                    //***********************************************************************************************
                    console.log('entrando a get ingreso2:' + obj.id_DrIngreso);
                    // getIgresoData(obj.id_DrIngreso)
                    //     .then((invoice) => {
                    //         if (invoice) {
                    //             var factura = {}
                    //             factura.FechaIngreso = new Date('1990-01-01');;
                    //             factura.ImporteTrasladoIngreso = 0;
                    //             factura.MetodoPagoIngreso = "";
                    //             factura.ImpuestoTrasladoIngreso = 'ND';
                    //             factura.TasaOCuotaTrasladoIngreso = 'ND';
                    //             factura.TipoFactorTrasladoIngreso = 'ND';
                    //             factura.ImporteRetencionIngreso = 0;
                    //             factura.ImpuestoRetencionIngreso = 'ND';
                    //             factura.TasaOCuotaRetencionIngreso = 'ND';
                    //             factura.TipoFactorRetencionIngreso = 'ND';
                    //             factura.TotalComprobanteIngreso = 0;
                    //             // console.log('buscando ingreso antes de reuslt:' + docid)
                    //             // tinvoice.then((invoice) => {
                    //             // var result2 = result;
                    //             console.log('encontrado idreld');
                    //             factura.FechaIngreso = invoice.Comprobante.Fecha;
                    //             factura.ImporteTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Importe;
                    //             factura.ImpuestoTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Impuesto;
                    //             factura.TasaOCuotaTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TasaOCuota;
                    //             factura.TipoFactorTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TipoFactor;
                    //             factura.MetodoPagoIngreso = invoice.Comprobante.MetodoPago;
                    //             factura.TotalComprobanteIngreso = invoice.Comprobante.Total
                    //             var existeret = invoice.Comprobante.cfdiImpuestos.hasOwnProperty("cfdiRetenciones")
                    //             if (existeret) {
                    //                 factura.ImporteRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Importe;
                    //                 factura.ImpuestoRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Impuesto;
                    //                 factura.TasaOCuotaRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TasaOCuota;
                    //                 factura.TipoFactorRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TipoFactor;
                    //             }

                    //             console.log('procesando get ingreso');
                    //             obj.FechaIngreso =  factura.FechaIngreso;
                    //             obj.MetodoPagoIngreso = factura.MetodoPagoIngreso;
                    //             obj.ImporteTrasladoIngreso = factura.ImporteTrasladoIngreso;
                    //             obj.ImpuestoTrasladoIngreso = factura.ImpuestoTrasladoIngreso;
                    //             obj.TasaOCuotaTrasladoIngreso = factura.TasaOCuotaTrasladoIngreso;
                    //             obj.TipoFactorTrasladoIngreso = factura.TipoFactorTrasladoIngreso;
                    //             obj.ImporteRetencionIngreso = factura.ImporteRetencionIngreso;
                    //             obj.ImpuestoRetencionIngreso = factura.ImpuestoRetencionIngreso;
                    //             obj.TotalComprobanteIngreso = factura.TotalComprobanteIngreso;
                    //             obj.TasaOCuotaRetencionIngreso = factura.TasaOCuotaRetencionIngreso;
                    //             obj.TipoFactorRetencionIngreso = factura.TipoFactorRetencionIngreso;
                    //         } else {
                    //             obj.FechaIngreso = new Date('1990-01-01');
                    //             obj.MetodoPagoIngreso = 'ND'
                    //             obj.ImporteTrasladoIngreso = 0;
                    //             obj.ImpuestoTrasladoIngreso = 'ND';
                    //             obj.TasaOCuotaTrasladoIngreso = 'ND';
                    //             obj.TipoFactorTrasladoIngreso = 'ND';
                    //             obj.ImporteRetencionIngreso = 0;
                    //             obj.ImpuestoRetencionIngreso = 'ND';
                    //             obj.TotalComprobanteIngreso = 0;
                    //             obj.TasaOCuotaRetencionIngreso = 'ND';
                    //             obj.TipoFactorRetencionIngreso = 'ND';
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.log(JSON.stringify(err + ' sin ingres 2-> ' + obj.id_DrIngreso));
                    //     });
                    //***
                    try {
                        var factura = await getIgresoData(obj.id_DrIngreso);
                        // console.log("------------------------------------------------ingreso"+obj.id_DrIngreso);
                        // console.log(JSON.stringify(factura));
                        if ((factura)) {
                            obj.FechaIngreso = factura.FechaIngreso;
                            obj.MetodoPagoIngreso = factura.MetodoPagoIngreso;
                            obj.ImporteTrasladoIngreso = factura.ImporteTrasladoIngreso;
                            obj.ImpuestoTrasladoIngreso = factura.ImpuestoTrasladoIngreso;
                            obj.TasaOCuotaTrasladoIngreso = factura.TasaOCuotaTrasladoIngreso;
                            obj.TipoFactorTrasladoIngreso = factura.TipoFactorTrasladoIngreso;
                            obj.ImporteRetencionIngreso = factura.ImporteRetencionIngreso;
                            obj.ImpuestoRetencionIngreso = factura.ImpuestoRetencionIngreso;
                            obj.TasaOCuotaRetencionIngreso=factura.TasaOCuotaRetencionIngreso;
                            obj.TipoFactorRetencionIngreso=factura.TipoFactorRetencionIngreso;
                            obj.TotalComprobanteIngreso = factura.TotalComprobanteIngreso;

                        } else {
                            obj.FechaIngreso = new Date('1990-01-01');
                            obj.MetodoPagoIngreso = 'ND'
                            obj.ImporteTrasladoIngreso = 0;
                            obj.ImpuestoTrasladoIngreso = 'ND';
                            obj.TasaOCuotaTrasladoIngreso = 'ND';
                            obj.TipoFactorTrasladoIngreso = 'ND';
                            obj.ImporteRetencionIngreso = 0;
                            obj.ImpuestoRetencionIngreso = 'ND';
                            obj.TasaOCuotaRetencionIngreso="";
                            obj.TipoFactorRetencionIngreso="";
                            obj.TotalComprobanteIngreso = 0;

                        }
                        lout.push(obj);
                        console.log('lout prcs2:'+lout.length);
                    } catch (e) { console.log(e); }
                }

            } else {
                console.log(' else p2');
            }
        } catch (ex) { console.log(" folio:" + UUID + ' vesrion:' + VersionCfdi + ' ok4:' + ex) }
        // var vp = pago.Comprobante.Complemento.pago10Pagos.Version || pago.Comprobante.Complemento.pago20Pagos.Version
        conti++;
        console.log(+conti + ' -lout: ' + lout.length + ' _id:' + cp._id + ' , ccfdiV:' + cp.Comprobante.Version, ' - pagoV:' + vp + ' id_Dr :' + obj.id_DrIngreso)
        // if ()

    }
    // });
    return lout

}

async function getIgresoData(docid) {
    // var db = mongoose.createConnection('mongodb://127.0.0.1:27017/docsdb');

    mongoose.connect(config.mongoUrl);
    const ingreso = mongoose.model('ingresos', cfdiSch.ingreso);

    // var invoice = (await ingreso.findById({
    //     '_id': docid
    // }).lean()).map(aBook => {
    //     // aBook.author = aBook.author._id
    //     console.log('encontrado');
    //     return aBook
    // })

    // var invoice = []

    var invoice = await ingreso.findById(docid).exec();
    // console.log('buscando ingreso antes de reuslt:' + JSON.stringify(invoice))
    // var factura = {}
    // factura.FechaIngreso = new Date('1990-01-01');;
    // factura.ImporteTrasladoIngreso = 0;
    // factura.MetodoPagoIngreso = "";
    // factura.ImpuestoTrasladoIngreso = 'ND';
    // factura.TasaOCuotaTrasladoIngreso = 'ND';
    // factura.TipoFactorTrasladoIngreso = 'ND';
    // factura.ImporteRetencionIngreso = 0;
    // factura.ImpuestoRetencionIngreso = 'ND';
    // factura.TasaOCuotaRetencionIngreso = 'ND';
    // factura.TipoFactorRetencionIngreso = 'ND';
    // factura.TotalComprobanteIngreso = 0;
    // console.log('buscando ingreso antes de reuslt:' + docid)
    // // tinvoice.then((invoice) => {
    // // var result2 = result;
    // console.log('encontrado idreld');
    // factura.FechaIngreso = invoice.Comprobante.Fecha;
    // factura.ImporteTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Importe;
    // factura.ImpuestoTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Impuesto;
    // factura.TasaOCuotaTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TasaOCuota;
    // factura.TipoFactorTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TipoFactor;
    // factura.MetodoPagoIngreso = invoice.Comprobante.MetodoPago;
    // factura.TotalComprobanteIngreso = invoice.Comprobante.Total
    // var existeret = invoice.Comprobante.cfdiImpuestos.hasOwnProperty("cfdiRetenciones")
    // if (!(existeret)) {
    //     return factura
    // }
    // factura.ImporteRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Importe;
    // factura.ImpuestoRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Impuesto;
    // factura.TasaOCuotaRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TasaOCuota;
    // factura.TipoFactorRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TipoFactor;
    // }).catch((err) => {
    //     console.log(err+' error buscando ingreso antes de rcatch euslt:'+ docid )
    //     return factura;
    // });

    var factura = {}
    factura.FechaIngreso=new Date('1990-01-01');
    factura.ImporteTrasladoIngreso = 0;
    factura.MetodoPagoIngreso = "";
    factura.ImpuestoTrasladoIngreso = 'ND';
    factura.TasaOCuotaTrasladoIngreso = 'ND';
    factura.TipoFactorTrasladoIngreso = 'ND';
    factura.ImporteRetencionIngreso = 0;
    factura.ImpuestoRetencionIngreso = 'ND';
    factura.TasaOCuotaRetencionIngreso = 'ND';
    factura.TipoFactorRetencionIngreso = 'ND';
    factura.TotalComprobanteIngreso = 0;
    // console.log(JSON.stringify(invoice))
    try {
        var existeCompr = invoice.hasOwnProperty("Comprobante")
        console.log("----t"+existeCompr);
        // if (!(existeCompr)) { return factura }
        console.log('encontrado ingreso:' + docid + ' importe:' + invoice.Comprobante.Total)
        factura.FechaIngreso=invoice.Comprobante.Fecha;
        factura.ImporteTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Importe;
        factura.ImpuestoTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.Impuesto;
        factura.TasaOCuotaTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TasaOCuota;
        factura.TipoFactorTrasladoIngreso = invoice.Comprobante.cfdiImpuestos.cfdiTraslados.cfdiTraslado.TipoFactor;
        factura.MetodoPagoIngreso = invoice.Comprobante.MetodoPago;
        factura.TotalComprobanteIngreso = invoice.Comprobante.Total
        var existeret = invoice.Comprobante.cfdiImpuestos.hasOwnProperty("cfdiRetenciones")
        if (!(existeret)) {
            return factura
        }
        factura.ImporteRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Importe;
        factura.ImpuestoRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.Impuesto;
        factura.TasaOCuotaRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TasaOCuota;
        factura.TipoFactorRetencionIngreso = invoice.Comprobante.cfdiImpuestos.cfdiRetenciones.cfdiRetencion.TipoFactor;
    } catch (err) { (console.log(err)) }
    // console.log("----------------------------------------------------------------factura result");
    // console.log(JSON.stringify(factura));
    return factura
}

exports.getPaymentsDatalail = getPaymentsDatalail