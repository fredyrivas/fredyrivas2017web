$(document).foundation();


var projectOpened = false;

var imageLoadedIndex = 0;

var filenamesOBJ;

var filenamesArray = [];

var isMobile = false;

var aboutOpened = false;

var currIlusionesImage;

var currentProjectText;

var minPhotosload = 3;


var introImageArray = [
    'images/estrategia-biologica/estrategia-biologica-02.jpg',
    'images/estrategia-biologica/estrategia-biologica-03.jpg',
    'images/estrategia-biologica/estrategia-biologica-05.jpg',
    'images/estrategia-biologica/estrategia-biologica-06.jpg',
    'images/estrategia-biologica/estrategia-biologica-07.jpg',
    'images/estrategia-biologica/estrategia-biologica-08.jpg',
    'images/estrategia-biologica/estrategia-biologica-09.jpg',
    'images/estrategia-biologica/estrategia-biologica-10.jpg',
    'images/estrategia-biologica/estrategia-biologica-11.jpg',
    'images/estrategia-biologica/estrategia-biologica-12.jpg',
    'images/estrategia-biologica/estrategia-biologica-13.jpg',
    'images/estrategia-biologica/estrategia-biologica-14.jpg'
];


var ilusionesImageArray = [];

ilusionesImageArray[0] = ['images/ilusiones-opticas/ilusiones-opticas-01.jpg', 'images/ilusiones-opticas/ilusiones-bts-01.jpg'];
ilusionesImageArray[1] = ['images/ilusiones-opticas/ilusiones-opticas-02.jpg', 'images/ilusiones-opticas/ilusiones-bts-02.jpg'];
ilusionesImageArray[2] = ['images/ilusiones-opticas/ilusiones-opticas-03.jpg', 'images/ilusiones-opticas/ilusiones-bts-03.jpg'];


$(document).ready(function () {

    showingAbout(0, false);

    reviewIsMobile();

    showingMenu(0, 0, 0);
    showingNavigation(0, 0);
    showingProjectsContainer(0, 0);
    showingIsLoading(0, 0);

    $('.menu-btn').bind('click', clickMenu);
    $('.close-menu').bind('click', clickMenuClose);
    $('.reveal-photo').bind('click', changeIlusionesImage);


    $('#enviamail').bind('click', sendContactmail);


    setPrejectItems();

    setRandIntroImage();
    setRandIlusionesImage();

});


$(window).load(function () {
    TweenMax.to('.preloader-site', .5, {
        autoAlpha: 0, onComplete: function () {
            $('.preloader-site').remove();
        }
    });
});


function setPrejectItems() {
    $.each($('.main-menu ul li'), function () {
        $(this).bind('click', clickProjectItem);
        $(this).bind('mouseover', overProjectItem);
        $(this).bind('mouseout', outProjectItem);
    });
}

function clickProjectItem(e) {

    switch ($(e.currentTarget).index()) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:

            if(aboutOpened){
                showingAbout(.5, false);

                if(!isMobile){
                    TweenMax.delayedCall(.5, setHeaderobjectsNormal);
                }
            }

            manageOpeningProject(e.currentTarget);

            TweenMax.delayedCall(.8, function () {
                getFileNames($(e.currentTarget).data('imagesdirectory'));
                projectOpened = true;
            });

            break;

        case 7:
            manageOpeningAbout();

            aboutOpened = true;

            break;
    }

    currentProjectText = $(e.currentTarget).text();

    trackAnalytics(currentProjectText, 'ver proyecto', 'abrir proyecto');
}


function manageOpeningAbout() {
    showingMenu(.3, 0, .1);
    showingIsLoading(.5, 1);

    TweenLite.to(window, 1, {scrollTo:0});

    if (!projectOpened) {
        TweenMax.delayedCall(.3, function () {

            setHeaderobjectsBlock();

            showingIntroContainer(.5, 0);

        });

        TweenMax.delayedCall(.8, function () {

            showingAbout(.5, true);

        });

    } else {

        TweenMax.delayedCall(.3, function () {

            showingProjectsContainer(.5, 0);
        });

        TweenMax.delayedCall(.8, function () {
            if (!isMobile) {
                $('.photo-container-projects').slick('unslick');
            }
            $('.photo-container-projects').html('');

            setHeaderobjectsBlock();
            showingAbout(.5, true);
        });
    }
}

function manageOpeningProject(etarget) {

    showingMenu(.3, 0, .1);
    showingIsLoading(.5, 1);

    TweenLite.to(window, 1, {scrollTo:0});

    $('.project-name').html($(etarget).text());


    if (!projectOpened) {
        TweenMax.delayedCall(.3, function () {
            showingIntroContainer(.5, 0);

            TweenMax.delayedCall(.5, function () {
                if (isMobile) {
                    $('.main-menu').css('left', '1px');
                    $('.main-menu').css('top', '105px');
                    $('.mobile-margin-home').css('display', 'none');
                }
            });


        });
    } else {
        TweenMax.delayedCall(.3, function () {
            showingProjectsContainer(.5, 0);

            if (!isMobile) {
                TweenMax.delayedCall(.5, function () {
                    $('.photo-container-projects').slick('unslick');
                });
            }

        });
    }
}


function overProjectItem(e) {
    $(e.currentTarget).css('fontStyle', 'italic');
}

function outProjectItem(e) {
    $(e.currentTarget).css('fontStyle', 'normal');
}

function clickMenu() {

    showingMenu(.4, 1, .1);
    if (projectOpened) {
        showingNavigation(.3, 0);
    }

    trackAnalytics('Menu general', 'click', 'Abrir');
}

function clickMenuClose() {
    showingMenu(.3, 0, .1);

    if (projectOpened) {
        showingNavigation(.3, 1);
    }

    trackAnalytics('Menu general', 'click', 'Cerrar');
}

function showingMenu(_time, _autoAlpha, _delay) {
    TweenMax.to('.main-menu', _time, {autoAlpha: _autoAlpha});
    TweenMax.to('.close-menu', _time, {delay: _delay, autoAlpha: _autoAlpha});
}

function showingNavigation(_time, _autoAlpha) {
    TweenMax.to('.navigation-panel', _time, {autoAlpha: _autoAlpha});
}

function showingProjectsContainer(_time, _autoAlpha) {
    TweenMax.to('.photo-container-projects', _time, {autoAlpha: _autoAlpha});
}

function showingIntroContainer(_time, _autoAlpha) {
    TweenMax.to('.photo-container-intro', _time, {autoAlpha: _autoAlpha, onComplete:function () {
      $('.photo-container-intro').remove();
    }});
}

function showingIsLoading(_time, _autoAlpha) {
    TweenMax.to('.is-loading', _time, {autoAlpha: _autoAlpha});
}

function showingAbout(_time, on_off) {
    if (on_off) {

        $('.about').css('display', 'block');
        showingIsLoading(.5, 0);

        TweenMax.to('.about', _time, {
            delay:.5, autoAlpha: 1});
    } else {
        TweenMax.to('.about', _time, {
            autoAlpha: 0, onComplete: function () {
                $('.about').css('display', 'none');
            }
        });
    }
}


function setProjectContainer(_arry) {

    $('.photo-container-projects').html('');


    $.each(_arry, function (i) {

        var fullname = _arry[i];
        var substrname = fullname.substr(fullname.length - 5, 1);

        if (!isMobile) {
            if (substrname == 'w') {
                $('.photo-container-projects').append('<div class="large-12 columns photo-item white-back" style="background-image: url(' + _arry[i] + ')"></div>');
            } else {
                $('.photo-container-projects').append('<div class="large-12 columns photo-item" style="background-image: url(' + _arry[i] + ')"></div>');
            }
        } else {
            $('.photo-container-projects').append('<div class="large-12 columns photo-item"><img src="' + _arry[i] + '" alt=""></div>');
        }

    });


    imageLoadedIndex = 0;
    loopPreloadimages();



    if (!isMobile) {
        $('.photo-container-projects').slick({
            draggable: true,
            infinite: true,
            speed: 500,
            fade: true,
            nextArrow: $('.nav-arrow-next'),
            prevArrow: $('.nav-arrow-prev')
        });

        $('.photo-container-projects').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            trackAnalytics(currentProjectText, 'ver proyecto', 'photo: '+nextSlide);

            changeColorElements(nextSlide);
        });
    }


}

function changeColorElements(_index) {
    if ($('.photo-container-projects .slick-slide').eq(_index).hasClass('white-back')) {
        TweenMax.set('.elements-color', {color: '#000'});
        $('.nav-arrow-next').attr('src', 'images/arrow-next-icon-b.svg');
        $('.nav-arrow-prev').attr('src', 'images/arrow-prev-icon-b.svg');
        $('.close-menu').attr('src', 'images/close-icon-b.svg');
    } else {
        TweenMax.set('.elements-color', {color: '#fff'});
        $('.nav-arrow-next').attr('src', 'images/arrow-next-icon-w.svg');
        $('.nav-arrow-prev').attr('src', 'images/arrow-prev-icon-w.svg');
        $('.close-menu').attr('src', 'images/close-icon-w.svg');
    }
}



function loopPreloadimages() {

    $('.preload-container').html('');
    $('.preload-container').append('<img src=' + filenamesArray[imageLoadedIndex] + ' alt="">');

    $('.preload-container').imagesLoaded()
        .progress(function (imgLoad, image) {


            if (filenamesArray.length > minPhotosload) {

                if (imageLoadedIndex == minPhotosload) {

                    displayLoadedContent();
                }
            }

        })
        .always(function () {

            if (imageLoadedIndex < filenamesArray.length - 1) {

                imageLoadedIndex++;
                loopPreloadimages();
            }
        })
        .done(function () {
            if (filenamesArray.length <= minPhotosload) {

                displayLoadedContent();
            }

        })
}


function displayLoadedContent() {
    if (!isMobile) {
        changeColorElements(0);
    }

    showingIsLoading(.3, 0);

    TweenMax.delayedCall(.3, function () {
        showingProjectsContainer(1, 1);
    });

    TweenMax.delayedCall(.6, showingNavigation, [.3, 1]);

}

function getFileNames(_path) {

    $.ajax({
        url: "get-images-names.php",
        data: {
            imagepath: 'images/' + _path
        },
        type: "post",
        success: function (response) {
            onFilenamesRecieved(response);
        }
    });
}


function onFilenamesRecieved(response) {

    filenamesArray = [];

    filenamesOBJ = JSON.parse(response);

    $.each(filenamesOBJ.directory, function (i, e) {
        filenamesArray.push(e.imagepath);
    });

    setProjectContainer(filenamesArray);
}


function reviewIsMobile() {
    if ($(window).width() < 640) {
        isMobile = true;
        setHeaderobjectsBlock();
    } else {
        isMobile = false;
    }
}


function setRandIntroImage() {
    var newimg = introImageArray[getRand(0, introImageArray.length - 1)];

    if (!isMobile) {
        $('.photo-container-intro').css('backgroundImage', 'url(' + newimg + ')');
    } else {
        $('.photo-container-intro').append('<img src="' + newimg + '" alt="">');
    }
}


function setRandIlusionesImage() {

    currIlusionesImage = getRand(0, ilusionesImageArray.length - 1);

    var newimg = ilusionesImageArray[currIlusionesImage][0];

    $('.ilusiones-container').attr('src', newimg);
}


function changeIlusionesImage() {
    var newimg = ilusionesImageArray[currIlusionesImage][1];

    $('.ilusiones-container').attr('src', newimg);

    trackAnalytics('change ilusiones photo', 'click', 'show original');
}


function getRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function setHeaderobjectsBlock() {
    TweenMax.set('.elements-color', {color: '#000'});
    $('.nav-arrow-next').attr('src', 'images/arrow-next-icon-b.svg');
    $('.nav-arrow-prev').attr('src', 'images/arrow-prev-icon-b.svg');
    $('.close-menu').attr('src', 'images/close-icon-b.svg');

    $('.mobile-margin-home').css('display', 'block');
}


function setHeaderobjectsNormal() {

    $('.mobile-margin-home').css('display', 'none');
}


function sendContactmail() {


    trackAnalytics('contact', 'send', 'enviar');

    $.ajax({
        url: "sendmail.php",
        data: {
            humanmail: $('#mailusuario').val()
        },
        type: "post",
        success: function (response) {
            console.log(response);

            if(response == 'sent'){
                TweenMax.to('.contactform', .3, {alpha:0, onComplete:function () {
                    $('.contactform').empty().html("<p class='about-text'><b>Great! You'll hear from me soon.</b></p>")
                    TweenMax.to('.contactform', .3, {alpha:1});
                }});
            }
        }
    });
}



$('#mailusuario').click(function () {
    trackAnalytics('contact', 'click', 'input mail');
});



function trackAnalytics(eventCategory, eventAction, eventLabel) {
    ga('send', 'event', eventCategory, eventAction, eventLabel);
}


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-92562737-1', 'auto');
