$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 60
            }, 1000);
        }
    });

    // Header transparency on scroll
    function toggleHeaderTransparency() {
        const scroll = $(window).scrollTop();
        if (scroll === 0) {
            $('header').addClass('transparent-header');
        } else {
            $('header').removeClass('transparent-header');
        }
    }
    toggleHeaderTransparency();
    $(window).on('scroll resize', toggleHeaderTransparency);

    // Hero text animation
    const texts = $('.animation-text');
    let currentText = 0;

    function rotateText() {
        texts.removeClass('active').eq(currentText).addClass('active');
        currentText = (currentText + 1) % texts.length;
    }
    setInterval(rotateText, 15000); // Rotate every 5 seconds

    // Set home as active by default
    $('li.home').addClass('active');

    // Set active class on nav click
    $('nav ul li a').on('click', function() {
        $('nav ul li').removeClass('active');
        $(this).parent().addClass('active');
    });

    // Debounced scroll handler for nav highlighting
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }

    $(window).on('scroll', debounce(function() {
        const scroll = $(window).scrollTop();
        let current = '';

        $('section').each(function() {
            const section = $(this);
            const top = section.offset().top - 100;
            const bottom = top + section.outerHeight();
            if (scroll >= top && scroll < bottom) {
                current = section.attr('id');
            }
        });

        if (scroll + $(window).height() >= $(document).height() - 10) {
            current = $('section').last().attr('id');
        }

        if (current) {
            $('nav ul li').removeClass('active');
            $(`nav ul li a[href="#${current}"]`).parent().addClass('active');
        } else {
            $('nav ul li').removeClass('active');
            $('li.home').addClass('active');
        }
    }, 100));

    // Form validation and submission
    $('form').on('submit', function(event) {
        event.preventDefault();
        const form = $(this);
        let isValid = true;
        let errorMessage = '';

        form.find('input[required], textarea[required]').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).css('border-color', 'red');
                errorMessage = 'Please fill out all required fields.';
            } else {
                $(this).css('border-color', '#ccc');
            }
        });

        if (isValid) {
            // Simulate form submission (replace with actual API call in production)
            alert('Form submitted successfully! (Demo mode)');
            form.trigger('reset');
            $('.register-form, .cover').hide();
            $('.register-btn').show();
        } else {
            alert(errorMessage);
        }
    });

    // Register form toggle with keyboard support
    $('.register-form, .cover').hide();
    $('.register-btn').click(() => {
        $('.register-form, .cover').show();
        $('.register-btn').hide();
        $('#reg-name').focus();
    })

    $('.close-btn').on('click keypress', function(event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
            $('.register-form, .cover').hide();
            $('.register-btn').show();
            $('form').trigger('reset');
        }
        // NAV BAR SHOW FOR MOBILE RESPONSIVE 
        $('#menu').click(() => {
            $('nav ul, #close-bar').show();
        })
    });
    // NAV BAR SHOW/HIDE FOR MOBILE
    $('#menu').on('click', function() {
        $('nav ul').fadeIn(200);
        $('#close-bar').fadeIn(200);
    });
    $('#close-bar').on('click', function() {
        $('nav ul').fadeOut(200);
        $('#close-bar').fadeOut(200);
    });
    $('nav ul li').on('click', function() {
        if (window.innerWidth <= 768) {
            $('nav ul').fadeOut(200);
            $('#close-bar').fadeOut(200);
        }
    });
    $('#currentYear').text(new Date().getFullYear());
});