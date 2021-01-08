// Set volume counter

function setVolume() {
    const slider = document.querySelector('.flyout input[type="range" i].slider');
    document.querySelector('.flyout .volume').innerHTML = slider.value;
    if (slider.value.length == 1) {
        document.querySelector('.flyout .volume').innerHTML = `0${slider.value}`;
    }
    // console.log(`Volume is now set to ${slider.value}.`);
}

// Toggle theme

let isDarkmode;
function toggleTheme() {
    document.documentElement.classList.toggle('darkmode');
    document.getElementById('toggle-theme').classList.toggle('selected');
    isDarkmode = !isDarkmode;
}

// Wait until elements are loaded

window.addEventListener('DOMContentLoaded', (event) => {
    // Set and watch system-prefered theme (based on snippet from https://www.abitofaccess.com/toggle-dark-mode-by-user-preference)
    let preference_query = window.matchMedia('(prefers-color-scheme: dark)');
    function checkPreference(query) {
        if (query.matches) {
            // A dark color scheme preference is set so we add the class from our html element
            document.documentElement.classList.add('darkmode');
            document.getElementById('toggle-theme').classList.add('selected');
            isDarkmode = true;
        } else {
            // No dark color scheme preference is set so we remove the class from our html element
            document.documentElement.classList.remove('darkmode');
            document.getElementById('toggle-theme').classList.remove('selected');
            isDarkmode = false;
        }
    }
    checkPreference(preference_query);
    preference_query.addListener(checkPreference);

    const sliderInputComponent = document.querySelector('.flyout input[type="range" i]');

    // Set volume
    setVolume();
    sliderInputComponent.addEventListener('input', event => {
        setVolume();
    });

    // Toggle theme when button is clicked
    const toggleButton = document.getElementById('toggle-theme');
    toggleButton.addEventListener('click', event => {
        toggleTheme();
    });

    // Randomize opacity on backdrop
    var backdropItems = document.querySelectorAll('.backdrop-overlay div');
    for (var i = 0; i < backdropItems.length; i++) {
        backdropItems[i].style.opacity = `${Math.random() * (0.075 - 0.025) + 0.025}`;
    }

    // Detect userAgent NT version and use protocol instead
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) {
        // console.log('User Agent has reported NT 10.0. Switching to protocol link.');
        document.getElementById('store-link').setAttribute('href', 'ms-windows-store://pdp/?ProductId=9mt60qv066rp');
    }

    // Slider
    // http://stryzhevskyi.github.io/rangeSlider/
    // Initialize a new plugin instance for one element or NodeList of elements.
    const slider = document.querySelector('input[type="range"].slider');
    rangeSlider.create(slider, {
        polyfill: true,     // Boolean, if true, custom markup will be created
        root: document,
        rangeClass: 'slider',
        disabledClass: 'disabled',
        fillClass: 'slider-fill',
        bufferClass: 'slider-track',
        handleClass: 'slider-thumb',
        startEvent: ['mousedown', 'touchstart', 'pointerdown'],
        moveEvent: ['mousemove', 'touchmove',   'pointermove'],
        endEvent: ['mouseup', 'touchend', 'pointerup'],
        vertical: false,    // Boolean, if true slider will be displayed in vertical orientation
        min: null,          // Number, 0
        max: null,          // Number, 100
        step: null,         // Number, 1
        value: 0,        // Number, center of slider
        buffer: null,       // Number, in percent, 0 by default
        stick: null,        // [Number stickTo, Number stickRadius] : use it if handle should stick to ${stickTo}-th value in ${stickRadius}
        borderRadius: 10,   // Number, if you're using buffer + border-radius in css
    });

    // update position
    const triggerEvents = true; // or false
    slider.rangeSlider.update({
        min : 0,
        max : 100,
        step : 1,
        value : 20,
        buffer : 100
    }, triggerEvents);
});
