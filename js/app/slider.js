'use strict';

var
        makeBSS = function (el, options) {
            var Slideshow = {
                init: function (el) {
                    var SPEED = 5000,
                            $slider = $(el)[0];

                    this.counter = 0;
                    this.numItems = $($slider).find('figure').length;

                    this.injectControls($slider);
                    this.addEventListeners();
                    this.autoCycle(SPEED);

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

                    /* "dot" buttons */
                    var $sliderButtons = $('<div>', {
                        class: 'slider-buttons'
                    }).appendTo(el);

                    for (var i = 0; i < this.numItems; i++) {
                        $('<span>').appendTo($sliderButtons);
                    }

                    /* prev/next buttons */
                    $('<span>', {
                        class: 'bss-prev',
                        html: '&laquo;'
                    }).appendTo(el);

                    $('<span>', {
                        class: 'bss-next',
                        html: '&raquo;'
                    }).appendTo(el);

                },
                addEventListeners: function () {
                    var root = this;

                    /* "dot" buttons */
                    $('.slider-buttons span').each(function (i, $span) {
                        $($span).on('click', function () {
                            root.showCurrent(i);
                        });
                    });

                    /* prev/next buttons */
                    $('.bss-next').on('click', function () {
                        root.showCurrent('+');
                    });
                    $('.bss-prev').on('click', function () {
                        root.showCurrent('-');
                    });
                },
                autoCycle: function (speed) {
                    var root = this;
                    window.setInterval(function () {
                        root.showCurrent('+');
                    }, speed);
                }
            },
            $slideshow = Object.create(Slideshow);

            $slideshow.init(el, options);
        },
        makeCrsl = function (el) {
            var Carousel = {
                init: function () {
                    this.STEP = 340,
                            $crsl = $(el);
                    this.numItems = $('.crsl-item').length;
                    this.position = 0;
                    this.injectControls($crsl);
                    this.addEventListeners();
                },
                scroll: function (position) {
                    $('.crsl-wrapper').css('transform', 'translate3d(' + position + 'px, 0px, 0px)');
                },
                injectControls: function ($crsl) {
                    /* prev/next buttons */
                    var $carouselBtn = $('<div>', {
                        class: 'carousel-btn'
                    }).insertAfter($crsl);

                    $('<div>', {
                        class: 'crsl-prev'
                    }).appendTo($carouselBtn);

                    $('<div>', {
                        class: 'crsl-next'
                    }).appendTo($carouselBtn);
                },
                addEventListeners: function () {
                    var root = this;

                    $('.crsl-next').on('click', function () {
                        if (root.position > ((root.numItems - 3) * -root.STEP)) {
                            root.position -= root.STEP;
                            root.scroll(root.position);
                        }
                    });

                    $('.crsl-prev').on('click', function () {
                        if (root.position !== 0) {
                            root.position += root.STEP;
                            root.scroll(root.position);
                        }
                    });
                }
            },
            $crsl = Object.create(Carousel);
            $crsl.init();
        };

$(document).ready(function () {
    makeBSS('.bss-slides');
    makeCrsl('.crsl-wrapper-outer');
});