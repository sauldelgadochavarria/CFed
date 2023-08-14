/*
Template Name:CFDI FED  Admin-Dashboard
Author: mxraymon
Website: https://raymon.com/
Contact: raymon@gmail.com
File: Timeline Init Js File
*/

$('#timeline-carousel').owlCarousel({
    items: 1,
    loop: false,
    margin:0,
    nav: true,
    navText : ["<i class='mdi mdi-chevron-left'></i>","<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive:{
        576:{
            items:2
        },

        768:{
            items:3
        },
        1200:{
            items:4
        },
    }
});