/*
Template Name:CFDI FED  Admin-Dashboard
Author: mxraymon
Website: https://raymon.com/
Contact: raymon@gmail.com
File: Datatables Js File
*/



$(document).ready(function() {


    // var  data = table.rows().data();

         var dwbtn=  {    text: 'Descarga',
                action: function (  ) {
                    var fileKeysString = "uni";
                    var newFileKeys = "dos";
                
                    fetch('/download', { fileKeys: newFileKeys })
                    .then(async res => ({
                        filename : res.headers.get('content-disposition').split('filename=')[1],
                        blob: await res.blob()
                    }))
                    .then(resObj => {
                        // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
                        const newBlob = new Blob([resObj.blob], { type: 'application/octet-stream' });
                
                        // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(newBlob);
                        } else {
                            // For other browsers: create a link pointing to the ObjectURL containing the blob.
                            const objUrl = window.URL.createObjectURL(newBlob);
                
                            let link = document.createElement('a');
                            link.href = objUrl;
                            link.download = resObj.filename;
                            link.click();
                
                            // For Firefox it is necessary to delay revoking the ObjectURL.
                            setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
                        }
                    })
                    .catch((error) => {
                        console.log('DOWNLOAD ERROR', error);
                    });
                }
            }
            var resbtn=  {    text: 'Resumen',
            action: function (  ) {
                alert( JSON.stringify( data[0]) );
            }
        }
    //Buttons examples
    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        // buttons: ['copy', 'excel', 'pdf', 'colvis']
        buttons: ['copy', 'excel', dwbtn, resbtn, 'colvis'],

    });
    

    var  data = table.rows().data();
    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        
        $(".dataTables_length select").addClass('form-select form-select-sm');


} );