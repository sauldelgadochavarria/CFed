var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// https://tools.w3cub.com/json-to-mongoose
// para convertir json a schema
// mongoose.connect('mongodb://127.0.0.1:27017/docsdb')
//     .then(() => {
//         console.info('connect successfully')
//     })
//     .catch(() => {
//         console.error('connection error');
//     });

// var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/docsdb');
// conn.on('connected', function() {  
//   console.log('Mongoose connected to connection');
// });    
var ingresoSchema = new mongoose.Schema({
  "_id": {
    "type": "String"
  },
  "Comprobante": {
    "xmlnscfdi": {
      "type": "String"
    },
    "xmlns:cartaporte20": {
      "type": "String"
    },
    "xmlnsxsd": {
      "type": "String"
    },
    "xmlns:xsi": {
      "type": "String"
    },
    "Certificado": {
      "type": "String"
    },
    "CondicionesDePago": {
      "type": "String"
    },
    "Fecha": {
      "type": "Date"
    },
    "Folio": {
      "type": "String"
    },
    "FormaPago": {
      "type": "String"
    },
    "LugarExpedicion": {
      "type": "String"
    },
    "MetodoPago": {
      "type": "String"
    },
    "Moneda": {
      "type": "String"
    },
    "NoCertificado": {
      "type": "String"
    },
    "Sello": {
      "type": "String"
    },
    "Serie": {
      "type": "String"
    },
    "SubTotal": {
      "type": "Number"
    },
    "TipoDeComprobante": {
      "type": "String"
    },
    "Total": {
      "type": "Number"
    },
    "Version": {
      "type": "String"
    },
    "xsischemaLocation": {
      "type": "String"
    },
    "Emisor": {
      "Rfc": {
        "type": "String"
      },
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscal": {
        "type": "String"
      },
      "UsoCFDI": {
        "type": "String"
      },
      "cfdiRegimenFiscal": {
        "Regimen": {
          "type": "String"
        }
      }
    },
    "Receptor": {
      "DomicilioFiscalReceptor": {
        "type": "String"
      },
      "Rfc": {
        "type": "String"
      },
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscalReceptor": {
        "type": "String"
      },
    },
    "Archivo": {
      "type": "String"
    },
    "Estatus": {
      "type": "String"
    },
    "FechaCancelacion": {
      "type": "String"
    },
    "Conceptos": {
      "type": "array",
      "Concepto": {
        "Cantidad": {
          "type": "Number"
        },
        "ClaveProdServ": {
          "type": "String"
        },
        "ClaveUnidad": {
          "type": "String"
        },
        "Descripcion": {
          "type": "String"
        },
        "Importe": {
          "type": "Number"
        },
        "NoIdentificacion": {
          "type": "String"
        },
        "Unidad": {
          "type": "String"
        },
        "ValorUnitario": {
          "type": "Number"
        },
        "cfdiImpuestos": {
          "cfdiTraslados": {
            "cfdiTraslado": {
              "Base": {
                "type": "Number"
              },
              "Importe": {
                "type": "Number"
              },
              "Impuesto": {
                "type": "String"
              },
              "TasaOCuota": {
                "type": "String"
              },
              "TipoFactor": {
                "type": "String"
              }
            }
          },
          "cfdiRetenciones": {
            "cfdiRetencion": {
              "Base": {
                "type": "Number"
              },
              "Importe": {
                "type": "Number"
              },
              "Impuesto": {
                "type": "String"
              },
              "TasaOCuota": {
                "type": "String"
              },
              "TipoFactor": {
                "type": "String"
              }
            }
          }
        
        }
      }
    },
    "cfdiImpuestos": {
      "TotalImpuestosRetenidos": {
        "type": "Number"
      },
      "TotalImpuestosTrasladados": {
        "type": "Number"
      },        
      "cfdiRetenciones": {
        "cfdiRetencion": {
          "Importe": {
            "type": "Number"
          },
          "Impuesto": {
            "type": "String"
          }
        }
      },
      "cfdiTraslados": {
        "cfdiTraslado": {
          "Importe": {
            "type": "Number"
          },
          "Impuesto": {
            "type": "String"
          },
          "TasaOCuota": {
            "type": "String"
          },
          "TipoFactor": {
            "type": "String"
          }
        }
      }
    },
    "Complemento": {
      "TimbreFiscalDigital": {
        "xsischemaLocation": {
          "type": "String"
        },
        "version": {
          "type": "String"
        },
        "UUID": {
          "type": "String"
        },
        "FechaTimbrado": {
          "type": "Date"
        },
        "selloCFD": {
          "type": "String"
        },
        "noCertificadoSAT": {
          "type": "String"
        },
        "selloSAT": {
          "type": "String"
        },
        "xmlnstfd": {
          "type": "String"
        },
        "xmlnsxsi": {
          "type": "String"
        }
      },
      "nomina12Nomina": {
        "xmlnsnomina12": {
          "type": "String"
        },
        "Version": {
          "type": "String"
        },
        "TipoNomina": {
          "type": "String"
        },
        "FechaPago": {
          "type": "Date"
        },
        "FechaInicialPago": {
          "type": "Date"
        },
        "FechaFinalPago": {
          "type": "Date"
        },
        "NumDiasPagados": {
          "type": "Number"
        },
        "TotalPercepciones": {
          "type": "Number"
        },
        "TotalDeducciones": {
          "type": "Number"
        },
        "nomina12Emisor": {
          "RegistroPatronal": {
            "type": "String"
          }
        },
        "nomina12Receptor": {
          "Curp": {
            "type": "String"
          },
          "NumSeguridadSocial": {
            "type": "String"
          },
          "FechaInicioRelLaboral": {
            "type": "Date"
          },
          "Antigüedad": {
            "type": "String"
          },
          "TipoContrato": {
            "type": "String"
          },
          "Sindicalizado": {
            "type": "String"
          },
          "TipoJornada": {
            "type": "String"
          },
          "TipoRegimen": {
            "type": "String"
          },
          "NumEmpleado": {
            "type": "String"
          },
          "Departamento": {
            "type": "String"
          },
          "Puesto": {
            "type": "String"
          },
          "RiesgoPuesto": {
            "type": "String"
          },
          "PeriodicidadPago": {
            "type": "String"
          },
          "CuentaBancaria": {
            "type": "String"
          },
          "SalarioBaseCotApor": {
            "type": "String"
          },
          "SalarioDiarioIntegrado": {
            "type": "String"
          },
          "ClaveEntFed": {
            "type": "String"
          }
        },
        "nomina12Percepciones": {
          "TotalSueldos": {
            "type": "Number"
          },
          "TotalGravado": {
            "type": "Number"
          },
          "TotalExento": {
            "type": "Number"
          },
          "nomina12Percepcion": {
            "type": [
              "Mixed"
            ]
          }
        },
        "nomina12Deducciones": {
          "TotalOtrasDeducciones": {
            "type": "Number"
          },
          "TotalImpuestosRetenidos": {
            "type": "Number"
          },
          "nomina12Deduccion": {
            "type": [
              "Number"
            ]
          }
        }
      },
      "cartaporte20CartaPorte": {
        "TotalDistRec": {
          "type": "String"
        },
        "TranspInternac": {
          "type": "String"
        },
        "Version": {
          "type": "String"
        },
        "cartaporte20Ubicaciones": {
          "cartaporte20Ubicacion": {
            "type": [
              "Mixed"
            ]
          }
        },
        "cartaporte20Mercancias": {
          "NumTotalMercancias": {
            "type": "Number"
          },
          "PesoBrutoTotal": {
            "type": "Number"
          },
          "UnidadPeso": {
            "type": "String"
          },
          "cartaporte20Mercancia": {
            "BienesTransp": {
              "type": "String"
            },
            "Cantidad": {
              "type": "Number"
            },
            "ClaveUnidad": {
              "type": "String"
            },
            "Descripcion": {
              "type": "String"
            },
            "PesoEnKg": {
              "type": "Number"
            },
            "Unidad": {
              "type": "String"
            }
          },
          "cartaporte20Autotransporte": {
            "NumPermisoSCT": {
              "type": "String"
            },
            "PermSCT": {
              "type": "String"
            },
            "cartaporte20IdentificacionVehicular": {
              "AnioModeloVM": {
                "type": "Number"
              },
              "ConfigVehicular": {
                "type": "String"
              },
              "PlacaVM": {
                "type": "String"
              }
            },
            "cartaporte20Seguros": {
              "AseguraRespCivil": {
                "type": "String"
              },
              "PolizaRespCivil": {
                "type": "String"
              },
              "PrimaSeguro": {
                "type": "String"
              }
            },
            "cartaporte20Remolques": {
              "cartaporte20Remolque": {
                "type": [
                  "Mixed"
                ]
              }
            }
          }
        },
        "cartaporte20FiguraTransporte": {
          "cartaporte20TiposFigura": {
            "NombreFigura": {
              "type": "String"
            },
            "NumLicencia": {
              "type": "String"
            },
            "RFCFigura": {
              "type": "String"
            },
            "TipoFigura": {
              "type": "String"
            }
          }
        }
      },
    }
  }
}
);
var egresoSchema = new mongoose.Schema({
  "_id": {
    "type": "String"
  },
  "Comprobante": {
    "xmlnscfdi": {
      "type": "String"
    },
    "xmlnsxsd": {
      "type": "String"
    },
    "xmlnsxsi": {
      "type": "String"
    },
    "Certificado": {
      "type": "String"
    },
    "CondicionesDePago": {
      "type": "String"
    },
    "Fecha": {
      "type": "Date"
    },
    "Folio": {
      "type": "String"
    },
    "FormaPago": {
      "type": "String"
    },
    "LugarExpedicion": {
      "type": "String"
    },
    "MetodoPago": {
      "type": "String"
    },
    "Moneda": {
      "type": "String"
    },
    "NoCertificado": {
      "type": "String"
    },
    "Sello": {
      "type": "String"
    },
    "Serie": {
      "type": "String"
    },
    "SubTotal": {
      "type": "Number"
    },
    "TipoDeComprobante": {
      "type": "String"
    },
    "Total": {
      "type": "Number"
    },
    "Version": {
      "type": "String"
    },
    "xsi:schemaLocation": {
      "type": "String"
    },
    "cfdiCfdiRelacionados": {
      "TipoRelacion": {
        "type": "String"
      },
      "cfdiCfdiRelacionado": {
        "UUID": {
          "type": "String"
        }
      }
    },
    "Emisor": {
      "rfc": {
        "type": "String"
      },
      "nombre": {
        "type": "String"
      },
      "cfdiRegimenFiscal": {
        "Regimen": {
          "type": "String"
        }
      }
    },
    "Receptor": {
      "rfc": {
        "type": "String"
      },
      "nombre": {
        "type": "String"
      }
    },
    "Archivo": {
      "type": "String"
    },
    "Estatus": {
      "type": "String"
    },
    "FechaCancelacion": {
      "type": "String"
    },
    "Conceptos": {
      "type": "array",
      "Concepto": {
        "Cantidad": {
          "type": "Number"
        },
        "ClaveProdServ": {
          "type": "String"
        },
        "ClaveUnidad": {
          "type": "String"
        },
        "Descripcion": {
          "type": "String"
        },
        "Importe": {
          "type": "Number"
        },
        "NoIdentificacion": {
          "type": "String"
        },
        "Unidad": {
          "type": "String"
        },
        "ValorUnitario": {
          "type": "Number"
        },
        "cfdiImpuestos": {
          "cfdiTraslados": {
            "cfdiTraslado": {
              "Base": {
                "type": "Number"
              },
              "Importe": {
                "type": "Number"
              },
              "Impuesto": {
                "type": "String"
              },
              "TasaOCuota": {
                "type": "String"
              },
              "TipoFactor": {
                "type": "String"
              }
            }
          }
        }
      }
    },
    "cfdiImpuestos": {
      "TotalImpuestosTrasladados": {
        "type": "String"
      },
      "cfdiTraslados": {
        "cfdiTraslado": {
          "Importe": {
            "type": "Number"
          },
          "Impuesto": {
            "type": "String"
          },
          "TasaOCuota": {
            "type": "String"
          },
          "TipoFactor": {
            "type": "String"
          }
        }
      }
    },
    "Complemento": {
      "TimbreFiscalDigital": {
        "xsischemaLocation": {
          "type": "String"
        },
        "version": {
          "type": "String"
        },
        "UUID": {
          "type": "String"
        },
        "FechaTimbrado": {
          "type": "Date"
        },
        "selloCFD": {
          "type": "String"
        },
        "noCertificadoSAT": {
          "type": "String"
        },
        "selloSAT": {
          "type": "String"
        },
        "xmlnstfd": {
          "type": "String"
        },
        "xmlnsxsi": {
          "type": "String"
        }
      },
      "nomina12Nomina": {
        "xmlnsnomina12": {
          "type": "String"
        },
        "Version": {
          "type": "String"
        },
        "TipoNomina": {
          "type": "String"
        },
        "FechaPago": {
          "type": "Date"
        },
        "FechaInicialPago": {
          "type": "Date"
        },
        "FechaFinalPago": {
          "type": "Date"
        },
        "NumDiasPagados": {
          "type": "Number"
        },
        "TotalPercepciones": {
          "type": "Number"
        },
        "TotalDeducciones": {
          "type": "Number"
        },
        "nomina12Emisor": {
          "RegistroPatronal": {
            "type": "String"
          }
        },
        "nomina12Receptor": {
          "Curp": {
            "type": "String"
          },
          "NumSeguridadSocial": {
            "type": "String"
          },
          "FechaInicioRelLaboral": {
            "type": "Date"
          },
          "Antigüedad": {
            "type": "String"
          },
          "TipoContrato": {
            "type": "String"
          },
          "Sindicalizado": {
            "type": "String"
          },
          "TipoJornada": {
            "type": "String"
          },
          "TipoRegimen": {
            "type": "String"
          },
          "NumEmpleado": {
            "type": "String"
          },
          "Departamento": {
            "type": "String"
          },
          "Puesto": {
            "type": "String"
          },
          "RiesgoPuesto": {
            "type": "String"
          },
          "PeriodicidadPago": {
            "type": "String"
          },
          "CuentaBancaria": {
            "type": "String"
          },
          "SalarioBaseCotApor": {
            "type": "String"
          },
          "SalarioDiarioIntegrado": {
            "type": "String"
          },
          "ClaveEntFed": {
            "type": "String"
          }
        },
        "nomina12Percepciones": {
          "TotalSueldos": {
            "type": "Number"
          },
          "TotalGravado": {
            "type": "Number"
          },
          "TotalExento": {
            "type": "Number"
          },
          "nomina12Percepcion": {
            "type": [
              "Mixed"
            ]
          }
        },
        "nomina12Deducciones": {
          "TotalOtrasDeducciones": {
            "type": "Number"
          },
          "TotalImpuestosRetenidos": {
            "type": "Number"
          },
          "nomina12:Deduccion": {
            "type": [
              "Number"
            ]
          }
        }
      }
    }
  }
}
);
var pagoSchema = new mongoose.Schema({
  "_id": {
    "type": "String"
  },
  "Comprobante": {
    "xmlnscfdi": {
      "type": "String"
    },
    "xmlnspago20": {
      "type": "String"
    },
    "xmlnsxsi": {
      "type": "String"
    },
    "Certificado": {
      "type": "String"
    },
    "Exportacion": {
      "type": "String"
    },
    "Fecha": {
      "type": "Date"
    },
    "Folio": {
      "type": "String"
    },
    "LugarExpedicion": {
      "type": "String"
    },
    "Moneda": {
      "type": "String"
    },
    "NoCertificado": {
      "type": "String"
    },
    "Sello": {
      "type": "String"
    },
    "Serie": {
      "type": "String"
    },
    "SubTotal": {
      "type": "Number"
    },
    "TipoDeComprobante": {
      "type": "String"
    },
    "Total": {
      "type": "Number"
    },
    "Version": {
      "type": "String"
    },
    "xsischemaLocation": {
      "type": "String"
    },
    "Emisor": {
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscal": {
        "type": "String"
      },
      "Rfc": {
        "type": "String"
      }
    },
    "Receptor": {
      "DomicilioFiscalReceptor": {
        "type": "String"
      },
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscalReceptor": {
        "type": "String"
      },
      "Rfc": {
        "type": "String"
      },
      "UsoCFDI": {
        "type": "String"
      }
    },
    "Archivo": {
      "type": "String"
    },
    "Estatus": {
      "type": "String"
    },
    "FechaCancelacion": {
      "type": "String"
    },
    "Conceptos": {
      "type": "array",
      "Concepto": {
        "Cantidad": {
          "type": "Number"
        },
        "ClaveProdServ": {
          "type": "String"
        },
        "ClaveUnidad": {
          "type": "String"
        },
        "Descripcion": {
          "type": "String"
        },
        "Importe": {
          "type": "Number"
        },
        "ObjetoImp": {
          "type": "String"
        },
        "ValorUnitario": {
          "type": "Number"
        }
      }
    },
    "Complemento": {
      "type": "object",
      "pago10Pagos": {
        "Version": {
          "type": "String"
        },
        "pago10Pago": {
                // "type": "object",
          "FechaPago": {
            "type": "Date"
          },
          "FormaDePagoP": {
            "type": "String"
          },
          "MonedaP": {
            "type": "String"
          },
          "Monto": {
            "type": "Number"
          },
          "pago10DoctoRelacionado": {
            "type": "array",
            "Folio": {
              "type": "String"
            },
            "IdDocumento": {
              "type": "String"
            },
            "ImpPagado": {
              "type": "Number"
            },
            "ImpSaldoAnt": {
              "type": "Number"
            },
            "ImpSaldoInsoluto": {
              "type": "Number"
            },
            "MetodoDePagoDR": {
              "type": "String"
            },
            "MonedaDR": {
              "type": "String"
            },
            "NumParcialidad": {
              "type": "Number"
            },
            "Serie": {
              "type": "String"
            }
          }
        }
      },
      "pago20Pagos": {
        "Version": {
          "type": "String"
        },
        "pago20Totales": {
          "MontoTotalPagos": {
            "type": "Number"
          },
          "TotalTrasladosBaseIVA16": {
            "type": "Number"
          },
          "TotalTrasladosImpuestoIVA16": {
            "type": "Number"
          }
        },
        "pago20Pago": {
          "FechaPago": {
            "type": "Date"
          },
          "FormaDePagoP": {
            "type": "String"
          },
          "MonedaP": {
            "type": "String"
          },
          "Monto": {
            "type": "Number"
          },
          "TipoCambioP": {
            "type": "Number"
          },
          "pago20DoctoRelacionado": {
            "type": "array",
            "EquivalenciaDR": {
              "type": "String"
            },
            "Folio": {
              "type": "String"
            },
            "IdDocumento": {
              "type": "String"
            },
            "ImpPagado": {
              "type": "Number"
            },
            "ImpSaldoAnt": {
              "type": "Number"
            },
            "ImpSaldoInsoluto": {
              "type": "Number"
            },
            "MonedaDR": {
              "type": "String"
            },
            "NumParcialidad": {
              "type": "Number"
            },
            "ObjetoImpDR": {
              "type": "String"
            },
            "Serie": {
              "type": "String"
            },
            "pago20ImpuestosDR": {
              "pago20RetencionesDR": {
                "pago20RetencionDR": {
                  "BaseDR": {
                    "type": "Number"
                  },
                  "ImporteDR": {
                    "type": "Number"
                  },
                  "ImpuestoDR": {
                    "type": "String"
                  },
                  "TasaOCuotaDR": {
                    "type": "String"
                  },
                  "TipoFactorDR": {
                    "type": "String"
                  }
                }
            },
              "pago20TrasladosDR": {
                "pago20TrasladoDR": {
                  "BaseDR": {
                    "type": "Number"
                  },
                  "ImporteDR": {
                    "type": "Number"
                  },
                  "ImpuestoDR": {
                    "type": "String"
                  },
                  "TasaOCuotaDR": {
                    "type": "String"
                  },
                  "TipoFactorDR": {
                    "type": "String"
                  }
                }
              }
            }
          },
          "pago20ImpuestosP": {
            "pago20RetencionesP": {
              "pago20RetencionP": {
                  "ImporteP": "Number",
                  "ImpuestoP": "String"
              }
          },
            "pago20TrasladosP": {
              "pago20TrasladoP": {
                "BaseP": {
                  "type": "Number"
                },
                "ImporteP": {
                  "type": "String"
                },
                "ImpuestoP": {
                  "type": "String"
                },
                "TasaOCuotaP": {
                  "type": "String"
                },
                "TipoFactorP": {
                  "type": "String"
                }
              }
            }
          }
        }
      },
      "TimbreFiscalDigital": {
        "xmlns:tfd": {
          "type": "String"
        },
        "FechaTimbrado": {
          "type": "Date"
        },
        "noCertificadoSAT": {
          "type": "String"
        },
        "RfcProvCertif": {
          "type": "String"
        },
        "selloCFD": {
          "type": "String"
        },
        "selloSAT": {
          "type": "String"
        },
        "UUID": {
          "type": "String"
        },
        "Version": {
          "type": "String"
        },
        "xsischemaLocation": {
          "type": "String"
        }
      }
    }
  },
  "_id": {
    "type": "String"
  }
}
);
var nominaSchema = new mongoose.Schema({
  "_id": {
    "type": "String"
  },
  "Comprobante": {
    "xmlnscfdi": {
      "type": "String"
    },
    "xmlnsxsd": {
      "type": "String"
    },
    "xmlnsxsi": {
      "type": "String"
    },
    "Certificado": {
      "type": "String"
    },
    "CondicionesDePago": {
      "type": "String"
    },
    "Fecha": {
      "type": "Date"
    },
    "Folio": {
      "type": "String"
    },
    "FormaPago": {
      "type": "String"
    },
    "LugarExpedicion": {
      "type": "String"
    },
    "MetodoPago": {
      "type": "String"
    },
    "Moneda": {
      "type": "String"
    },
    "NoCertificado": {
      "type": "String"
    },
    "Sello": {
      "type": "String"
    },
    "Serie": {
      "type": "String"
    },
    "SubTotal": {
      "type": "Number"
    },
    "TipoDeComprobante": {
      "type": "String"
    },
    "Total": {
      "type": "Number"
    },
    "Version": {
      "type": "String"
    },
    "xsischemaLocation": {
      "type": "String"
    },    
    "Emisor": {
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscal": {
        "type": "String"
      },
      "Rfc": {
        "type": "String"
      }
    },
    "Receptor": {
      "DomicilioFiscalReceptor": {
        "type": "String"
      },
      "Nombre": {
        "type": "String"
      },
      "RegimenFiscalReceptor": {
        "type": "String"
      },
      "Rfc": {
        "type": "String"
      },
      "UsoCFDI": {
        "type": "String"
      }
    },
    "Archivo": {
      "type": "String"
    },
    "Estatus": {
      "type": "String"
    },
    "FechaCancelacion": {
      "type": "String"
    },
    "cfdiCfdiRelacionados": {
      "TipoRelacion": {
        "type": "String"
      },
      "cfdiCfdiRelacionado": {
        "UUID": {
          "type": "String"
        }
      }
    },
    "Conceptos": {
      "type": "array",
      "cfdiConcepto": {
        "Cantidad": {
          "type": "Number"
        },
        "ClaveProdServ": {
          "type": "String"
        },
        "ClaveUnidad": {
          "type": "String"
        },
        "Descripcion": {
          "type": "String"
        },
        "Importe": {
          "type": "Number"
        },
        "NoIdentificacion": {
          "type": "String"
        },
        "Unidad": {
          "type": "String"
        },
        "ValorUnitario": {
          "type": "Number"
        },
        "cfdiImpuestos": {
          "cfdiTraslados": {
            "cfdiTraslado": {
              "Base": {
                "type": "Number"
              },
              "Importe": {
                "type": "Number"
              },
              "Impuesto": {
                "type": "String"
              },
              "TasaOCuota": {
                "type": "String"
              },
              "TipoFactor": {
                "type": "String"
              }
            }
          }
        }
      }
    },
    "cfdiImpuestos": {
      "TotalImpuestosTrasladados": {
        "type": "String"
      },
      "cfdi:Traslados": {
        "cfdi:Traslado": {
          "Importe": {
            "type": "Number"
          },
          "Impuesto": {
            "type": "String"
          },
          "TasaOCuota": {
            "type": "String"
          },
          "TipoFactor": {
            "type": "String"
          }
        }
      }
    },
    "Complemento": {
      "TimbreFiscalDigital": {
        "xsischemaLocation": {
          "type": "String"
        },
        "version": {
          "type": "String"
        },
        "UUID": {
          "type": "String"
        },
        "FechaTimbrado": {
          "type": "Date"
        },
        "selloCFD": {
          "type": "String"
        },
        "noCertificadoSAT": {
          "type": "String"
        },
        "selloSAT": {
          "type": "String"
        },
        "xmlns:tfd": {
          "type": "String"
        },
        "xmlns:xsi": {
          "type": "String"
        }
      },
      "nomina12Nomina": {
        "xmlnsnomina12": {
          "type": "String"
        },
        "Version": {
          "type": "String"
        },
        "TipoNomina": {
          "type": "String"
        },
        "FechaPago": {
          "type": "Date"
        },
        "FechaInicialPago": {
          "type": "Date"
        },
        "FechaFinalPago": {
          "type": "Date"
        },
        "NumDiasPagados": {
          "type": "Number"
        },
        "TotalPercepciones": {
          "type": "Number"
        },
        "TotalDeducciones": {
          "type": "Number"
        },
        "nomina12Emisor": {
          "RegistroPatronal": {
            "type": "String"
          }
        },
        "nomina12Receptor": {
          "Curp": {
            "type": "String"
          },
          "NumSeguridadSocial": {
            "type": "String"
          },
          "FechaInicioRelLaboral": {
            "type": "Date"
          },
          "Antigüedad": {
            "type": "String"
          },
          "TipoContrato": {
            "type": "String"
          },
          "Sindicalizado": {
            "type": "String"
          },
          "TipoJornada": {
            "type": "String"
          },
          "TipoRegimen": {
            "type": "String"
          },
          "NumEmpleado": {
            "type": "String"
          },
          "Departamento": {
            "type": "String"
          },
          "Puesto": {
            "type": "String"
          },
          "RiesgoPuesto": {
            "type": "String"
          },
          "PeriodicidadPago": {
            "type": "String"
          },
          "CuentaBancaria": {
            "type": "String"
          },
          "SalarioBaseCotApor": {
            "type": "String"
          },
          "SalarioDiarioIntegrado": {
            "type": "String"
          },
          "ClaveEntFed": {
            "type": "String"
          }
        },
        "nomina12Percepciones": {
          "TotalSueldos": {
            "type": "Number"
          },
          "TotalGravado": {
            "type": "Number"
          },
          "TotalExento": {
            "type": "Number"
          },
          "nomina12Percepcion": {
            "type": [
              "Mixed"
            ]
          }
        },
        "nomina12Deducciones": {
          "TotalOtrasDeducciones": {
            "type": "Number"
          },
          "TotalImpuestosRetenidos": {
            "type": "Number"
          },
          "nomina12Deduccion": {
            "type": [
              "Mixed"
            ]
          }
        }
      }
    }
  }
}
);

// const ingreso = conn.model('cfdi_i', ingresoSchema);
// const egreso = conn.model('cfdi_e', egresoSchema);

module.exports = { ingreso: ingresoSchema, egreso: egresoSchema, pago: pagoSchema, nomina: nominaSchema  }