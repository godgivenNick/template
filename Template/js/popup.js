$('#popup').fancybox({
    'padding': 37,
    'overlayOpacity': 0.87,
    'overlayColor': '#fff',
    'transitionIn': 'none',
    'transitionOut': 'none',
    'titlePosition': 'inside',
    'centerOnScroll': true,
    'maxWidth': 320
});

$('#popup').fancybox({
    helpers: {
        overlay: {
            locked: false
        }
    }
});