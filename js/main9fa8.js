$(document).ready(function () {
    toastr.options.positionClass = 'toast-bottom-left';
    $(document).on('ajaxError',function(event, error, thrownError) {
        if (error.status == 200 || error.status == 0 || error.status == 302) {
            return;
        }
        event.preventDefault();
        toastr.error(error.statusText);
        $('#form-loader').hide();
    });
    
    if ($('.time-display').length) {
        window.setInterval(tick, 1000);
    }

    // on click - toggle visibility of filter fields
    $(document).on('click', '.toggle-filter', function (event)
    {
        event.preventDefault();
        if (!event.isPropagationStopped()) {
            toggleFilter($(this));
        }
        return false;
    });

    // Add hover event for Pro feature icon: change its image on hover
    $(document).on('mouseenter mouseleave', '.pro-feature', function() {
        var $img = $(this).find('img');

        if (!$img.length) {
            return;
        }

        if ('mouseout' == event.type) {
            var imgSrc = $img.data('init-src');
        } else {
            var imgSrc = $img.data('hover-src');
        }
        if (imgSrc) {
            $img.attr('src', imgSrc);
        }
    });
    proFilterBlur();

    if (openTrialOverModal) {
        $('#trialOverModal').modal('show');
    }
    if (showTrialModal) {
        $('#trialCongratulationsModal').modal('show');
    }
});


/*---LEFT BAR ACCORDION----*/

var Script = function () {


//    sidebar dropdown menu auto scrolling
/*
    jQuery('#sidebar .sub-menu > a').click(function () {
        var o = ($(this).offset());
        diff = 250 - o.top;
        if(diff>0)
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });
*/


//    button to top
    function buttonToTop() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.button-to-top').show('slide', {direction: 'left'}, 100);
            } else {
                $('.button-to-top').hide('slide', {direction: 'left'}, 100);
            }
        });

        $('.button-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 300);
            return false;
        });

        $(document).ready(function () {
            if ($(this).scrollTop() > 100) {
                $('.button-to-top').show('slide', {direction: 'left'}, 100);
            }
        });
    }

//    sidebar toggle
    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
            }

            if (wSize >= 768) {
                var sidebarCondition = getCookie('sidebarCondition');
                if (sidebarCondition === 'open' || sidebarCondition === '') {
                    $('#container').removeClass('sidebar-close');
                    $('#sidebar > ul').show();
                } else {
                     $('#main-content').css({
                        'margin-left': '0px'
                    });
                    $('#sidebar > ul').hide();
                    $('#sidebar').css({
                        'margin-left': '-210px'
                    });
                }
            }
            
            if(wSize <= 600){
                $('.store-page .desc').removeClass('col-xs-6');
                $('.store-page .desc').addClass('col-xs-12');
            }
            
            if(wSize > 600){
                $('.store-page .desc').removeClass('col-xs-12');
                $('.store-page .desc').addClass('col-xs-6');
            }
            
            if(wSize > 750){
                $('.responsive-menu').show();
            }          
            if(wSize <= 750){
                $('.responsive-menu').hide();
            }
            
            if(wSize <= 790){
                buttonToTop();
            }
            if(wSize <=767){
                $('#container').addClass('sidebar-closed');
                /*if('.sidebar-closed'){
                    ('.header .nav.top-right').toggleClass('show');
                }
                $('sidebar-closed').hide();*/
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', function(){
            responsiveView();
            proFilterBlur();
        });
    });

    $('.fa-bars').click(function () {
        var wSize = $(window).width();
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('.footer').css({
                'padding-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-210px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
            if (wSize >= 768) {
                document.cookie = "sidebarCondition=close";
            }
        } else {
            $('#main-content').css({
                'margin-left': '210px'
            });
            $('.footer').css({
                'padding-left': '210px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
            if (wSize >= 768) {
                document.cookie = "sidebarCondition=open";
            }
        }
        if(wSize <= 767){
            $('.footer').css({
                'padding-left': '15px'
            });  
        }
    });

// custom scrollbar
/*
    $("#sidebar").niceScroll({styler:"fb",cursorcolor:"cadetblue", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

    $("html").niceScroll({styler:"fb",cursorcolor:"cadetblue", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});
*/
// widget tools

    jQuery('.panel .tools .fa-chevron-down').click(function () {
        var el = jQuery(this).parents(".panel").children(".panel-body");
        if (jQuery(this).hasClass("fa-chevron-down")) {
            jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });

    jQuery('.panel .tools .fa-times').click(function () {
        jQuery(this).parents(".panel").parent().remove();
    });


//    tool tips
    
    if ($('.tooltips').length) {
        $('.tooltips').tooltip();
    } 

//    popovers
    if ($('.popovers').length) {
        $('.popovers').tooltip();
    } 

// custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }

// -------- Filter ----------
if (!$('#operator').length) {
    addGridViewFilterButton();
}
// -------- Filter ----------  
  
}();


function addGridViewFilterButton() {
    $('.grid-view').each(function () {
        var id = $(this).attr('id');
        var toggleFilterButton = $(this).find('.toggle-filter');
        if (toggleFilterButton.length) {
            toggleFilterButton.attr('data-toggle-filters', '#'+id+'-filters');
        } else {
            var summary = $(this).find('.summary');
            if (summary) {
                // add filter button on top of table
                summary.append('<a href="#" class="toggle-filter" data-toggle-filters="#'+id+'-filters"><span style="padding:0 5px"></span><i class="btn btn-xs btn-outline btn-primary fa fa-filter"></i> Filter List</a>');
        
            }
        }
        // if a filter applied - show filters on page load
        if ($('#'+id+'-filters').find('.form-control').filter(function() { return $(this).val(); }).length > 0) {
            $('#'+id+'-filters').toggle();
        }
    });
}

/* ------------------- ebay suggestion box -------------------- */

var timer;
$(document).on('keyup', '#suggestion-box',function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        clearTimeout(timer);
        var searchterm = encodeURIComponent($('#suggestion-box').val());
        if (searchterm.length < 3) { return; }
        $('#suggestion-results').html('<div class="la-ball-clip-rotate-pulse la-dark la-sm"><div></div><div></div></div>');
        $.ajax({
            url: 'https://autosug.ebay.com/autosug?kwd=' + searchterm.replace(/[.*+?^${}()|[\]\\]/g, '%20') + '&_jgr=1&sId=0&callback=ebayresult',
            dataType: 'jsonp',
            type: 'GET',
            async: false,
            success: function(res) {
                var words = res;
            }
        });
        
    }, 1500);
});

function ebayresult(res) {
    if (res.res) {
        var list = '', items = res.res.sug;
        $(items).each(function(i) {
            var itm = items[i];
            itm = itm.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });            
            list += '<a class="btn btn-suggestion btn-suggested btn-sm" role="button">' + items[i] + '</a>';
        });
        $('#suggestion-results').html(list);
    }
    else {
        $('#suggestion-results').html('No results.');
    }
}

/* ------------------- /ebay suggestion box -------------------- */


/* ------------------- intercom support ticket -------------------- */

// Display form for adding existing item
$(document).on('click', '#intercom-support', function (event)
{
    event.preventDefault();
    Intercom('show');
});

/* ------------------- /groove support ticket -------------------- */


$(document).on('click', '.settings-block', function (event) {
    $('.settings-block .user-menu-settings').slideToggle(100);
    $(this).toggleClass('active');
});

$(document).mouseup (function (e) {
    if ($('.settings-block').has(e.target).length === 0) {
        if ($('.settings-block.active').length) {
            $('.settings-block .user-menu-settings').slideToggle(100);
            $('.settings-block').removeClass('active');
        }
    }
});

// add setting menu in #sidebar when screen size< 992px
var wSize = $(window).width();

if(wSize < 1080){
    var setMenu = $('.header_bg .nav.top-right');
    var mainMenu = $('#sidebar #nav-accordion');
    $(setMenu).prependTo(mainMenu);
    $('.header-target-link a i').after('Target Link');
    $('.header-target-link').prependTo($('ul.user-menu-settings'));
    $('.nav.top-right .linked-accounts-header').prependTo('.user-menu-settings');
    $('.user-menu-settings .linked-accounts-header a').append('Accounts');
    $('.user-menu-settings').css('z-index', '100');
}

// Open help video Modal in any page
$(document).on('click', '#help-vid-btn', function (event)
{
    var page = $(this).data('page');
    $.ajax({
        url: '/site/help-video',
        data: { page: page }, 
        success: function (data) {
            $('#help-video .modal-body').html(data);
            $('#help-video').modal('show');
        }
    });
});

//
$(document).on('click', '.sidebar-open', function (event) {
    $('.sidebar-open_submenu', this).hide();
    var wSize = $(window).width();
    if(wSize < 768){
        $('> a', this).toggleClass('disable');
        if($('> a', this).hasClass('disable')){
            event.preventDefault($(this)); 
            $('.sidebar-open_submenu', this).show();
        }  
    }  
});
//

$(document).ready(function(){
    var wSize = $(window).width();
    if(wSize > 767){
        $('.sidebar-open').hover(function () {
            var target = $(this).data('target');
            $('#'+target).clearQueue().stop().slideDown('slow');
        });
        
        /*$('.sidebar-open').mouseleave(function () {
            setTimeout(function() {
                if ($('.sidebar-pop:hover').length > 0) {
                    return;
                } else {
                    $('.sidebar-pop').clearQueue().stop().slideUp(200);
                }
            }, 100);
        });
        
        $('.sidebar-pop').mouseleave(function() {
            setTimeout(function() {
                if ($('.sidebar-open:hover').length > 0) {
                    return;
                } else {
                    $('.sidebar-pop').clearQueue().stop().slideUp(200);
                }
            }, 100);
        });*/
        
        $('.sidebar-open').mouseleave(function () {
            setTimeout(function() {
                if ($('.sidebar-open_submenu:hover').length > 0) {
                    return;
                } else {
                    $('.sidebar-open_submenu').clearQueue().stop().slideUp(200);
                }
            }, 100);
        });
        
        $('.sidebar-open_submenu').mouseleave(function() {
            setTimeout(function() {
                if ($('.sidebar-open:hover').length > 0) {
                    return;
                } else {
                    $('.sidebar-open_submenu').clearQueue().stop().slideUp(200);
                }
            }, 100);
        });
    }
});


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// save function for future usage
function tick() {
    var time = $('.time-display');
    
    if (time.length < 1) {
        return;
    }
    
    var myTime = time.html();
    var f = myTime.split(" ");
    var ss = f[0].split(":");
    var dt = new Date();
    dt.setHours(ss[0]);
    dt.setMinutes(ss[1]);
    var dt2 = new Date(dt.valueOf() + 1000);
    var ts = dt2.toTimeString().split(" ")[0];

    $('.time-display').html(ts);
}

$(document).on('click', '[id ^= popover-]', function (event) {
  event.preventDefault();
});

//toggle grid view filters
function toggleFilter(filterButton)
{
    var id = filterButton.data('toggle-filters');
    if (id) {
        $(id).toggle();    
    }
}


// height for table 
function addTableMaxHeight() {
    $('.table-max-height').each(function () {
        var height = $(window).height() / 100 * 60;
        $(this).css({"max-height": height});
    })
}

$(document).on('load', '.table-max-height', function(){
    addTableMaxHeight();
});


/* Checkboxes */

$('.radio label input[type=radio]').after('<span class="checkradio"></span>');

$('.checkbox label input[type=checkbox]').after('<span class="checkblock"></span>');

function proFilterBlur()
{
    $('.pro-filter-blur').each(function() {
        if (!$(this).find('.pro-filter-blur-text').length) {
            $(this).append('<div class="pro-filter-blur-text"><h3></h3><p></p></div>');
            $(this).find('.pro-filter-blur-text h3').html($(this).data('title'));
            $(this).find('.pro-filter-blur-text p').html($(this).data('text'));
            $(this).on('click', function(e) {
                $('#planFeature-modal').modal('toggle');
                e.stopPropagation();
            });
        }
        $(this).find('.pro-filter-blur-text').css({
            'top': $(this).height()/2 - $(this).find('.pro-filter-blur-text').height()/2+'px',
        });
    });
}

$(document).on('click', '.popover-questionmark[data-trigger="hover"]', function(e) {
    e.preventDefault();
});

$('#logoutCollapse').on('click', function() {
    if ($($(this).data('target')).hasClass('in')) {
        $(this).children('i.chevron').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    } else {
        $(this).children('i.chevron').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    }
});