/*
Template Name:CFDI FED  Admin-Dashboard
Author: mxraymon
Website: https://raymon.com/
Contact: raymon@gmail.com
File: ecommerce cart Js File
*/

var defaultOptions = {
};

$('[data-toggle="touchspin"]').each(function (idx, obj) {
    var objOptions = $.extend({}, defaultOptions, $(obj).data());
    $(obj).TouchSpin(objOptions);
});