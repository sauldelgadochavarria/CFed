/*
Template Name:CFDI FED  Admin-Dashboard
Author: mxraymon
Website: https://raymon.com/
Contact: raymon@gmail.com
File: Table responsive Init Js File
*/

$(function() {
    $('.table-responsive').responsiveTable({
        addDisplayAllBtn: 'btn btn-secondary'
    });

    $('.btn-toolbar [data-toggle=dropdown]').attr('data-bs-toggle', "dropdown");
});