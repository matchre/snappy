
function personaLogin() {
    navigator.id.get(function(assertion) {
        if(!assertion) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/persona/verify',
            data: JSON.stringify({
                assertion: assertion
            }),
            processData: false,
            contentType: 'application/json',
            success: function(data) {
                try {
                    data = JSON.parse(data);

                    if (data.status === "okay") {
                        if(data.freshman) {
                            // If new user, show introduction page
                            window.location = '/freshman';
                        }
                        else {
                            window.location = location;
                        }

                        $('.login').html('Logging in... <img src="/img/loader.gif" />');
                    } else {
                        alert('Login failed, try again later');
                    }
                } catch (ex) {
                    // oh no, we didn't get valid JSON from the server
                }
            }
        });
    });
}

function personaLogout() {
    $.ajax({
        type: 'POST',
        url: '/persona/logout',
        success: function() {
            window.location.href = window.location.href;
        }
    });
}

// $('button.next, a.next').live('click', function(e) {
//     var matches = /next=([^&]*)/.exec(window.location.search);
//     var url = matches[1];

//     if(url.indexOf('?') !== -1) {
//         url += '&';
//     }
//     else {
//         url += '?';
//     }

//     url += 'redirected=true';
//     window.location.href = url;
// });

window.addEventListener('DOMContentLoaded', function() {
    var clickEvent = 'ontouchstart' in document.documentElement ? 'touchend' : 'click';

    if(clickEvent != 'touchend') {
        $('.mobile-nav-buttons').addClass('no-touch');
    }

    $('.menu-icon').on(clickEvent, function() {
        var menu = $('.mobile-nav-buttons');
        var btn = $('.menu-icon');

        if(menu.hasClass('show')) {
            menu.removeClass('show');
            btn.removeClass('selected');
        }
        else {
            menu.addClass('show');
            btn.addClass('selected');
        }
    });

    $('body.post article .in-margin').each(function() {
        var el = $(this);
        var offset = el.offset();
        var html = el.html();
        el.remove();

        html = ('<div class="in-margin-wrapper">' +
                '<div class="in-margin">' +
                html + '</div></div>');

        $(html).appendTo('.margin')
            .css({ top: offset.top });
    });

    var headerEl = $('.major-post');

    if(headerEl.data('bg')) {
        var parts = headerEl.data('bg').split('.');
        var bgcss = 'url(/img/' + parts[0] + '-blur.' + parts[1] + ')';
        headerEl.css({ 'background-image': bgcss });
    }
});

$("#browserid").click(function(){
    personaLogin();
});

$("#browserid-logout").click(function() {
    personaLogout();
});

$('.login a.logout').click(function(e) {
    e.preventDefault();

    $.post('/persona/logout', function() {
        window.location = '/';
    });
});

$('ul.list li').on('click', function() {
    var anchor = $(this).children('a')[0];
    window.location.href = anchor.href;
});
