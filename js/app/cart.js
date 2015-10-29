'use strict';

$(document).ready(function () {
    
    $('.cart-link').on('click', function () {
        $('.cart-popup').show('fast');        
    });
    
    $('header .cart-popup .btn-close').on('click', function () {
        $('.cart-popup').hide('fast');
    });
});