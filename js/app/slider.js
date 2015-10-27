'use strict';

var makeBSS = function (el, options) {
    var $slideshow = {},
            Slideshow = {
                init: function (el) {
                    var SPEED = 10000,
                            $slider = $(el)[0];

                    this.counter = 0;
                    this.numItems = $($slider).find('figure').length;

                    this.injectControls($slider);
                    this.addEventListeners($slider);
                    this.autoCycle($slider, SPEED);

                    $('.bss-slides figure').eq(0).addClass('bss-show');
                    $('.slider-buttons span').eq(0).addClass('bss-show');
                },
                showCurrent: function (i) {
                    
                    /* if +/- then prev/next, number specifies slide */
                    if (i === '+') {
                        this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                    } else if (i === '-') {
                        this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                    } else {
                        this.counter = i;
                    }

                    $('.bss-show').removeClass('bss-show');
                    $('.bss-slides figure').eq(this.counter).addClass('bss-show');

                    $('.slider-buttons span.active').removeClass('bss-show');
                    $('.slider-buttons span').eq(this.counter).addClass('bss-show');
                },
                injectControls: function (el) {
                    var $sliderButtons = $('<div>', {
                        class: 'slider-buttons'
                    }).appendTo(el);

                    for (var i = 0; i < this.numItems; i++) {
                        $('<span>').appendTo($sliderButtons);
                    }

                    $('<span>', {
                        class: 'bss-prev',
                        html: '&laquo;'
                    }).appendTo(el);

                    $('<span>', {
                        class: 'bss-next',
                        html: '&raquo;'
                    }).appendTo(el);

                },
                addEventListeners: function (el) {
                    var root = this;

                    $('.slider-buttons span').each(function (i, $span) {
                        $($span).on('click', function () {
                            root.showCurrent(i);
                        });
                    });

                    $('.bss-next').on('click', function () {
                        root.showCurrent('+');
                    });

                    $('.bss-prev').on('click', function () {
                        root.showCurrent('-');
                    });
                },
                autoCycle: function (el, speed) {
                    var root = this;
                    window.setInterval(function () {
                        root.showCurrent('+');
                    }, speed);
                }
            };

    $slideshow = Object.create(Slideshow);
    $slideshow.init(el, options);
};

$(document).ready(function () {
    makeBSS('.bss-slides');
});