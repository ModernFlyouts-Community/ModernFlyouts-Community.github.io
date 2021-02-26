// SVGS

const moon_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="33.063" height="35.982" viewBox="0 0 33.063 35.982">
<path id="Moon" d="M37.9,33.009a18.007,18.007,0,0,1-30.41,1.221,1.35,1.35,0,0,1,.657-2.036c6.78-2.427,10.412-5.239,12.519-9.261C22.887,18.7,23.46,14.058,21.908,7.7a1.35,1.35,0,0,1,1.384-1.668A18.006,18.006,0,0,1,37.9,33.009Zm-15.02-8.917c-2.3,4.4-6.112,7.431-12.426,9.907a15.5,15.5,0,1,0,14.7-25.231l-.469-.08C25.882,14.655,25.28,19.516,22.883,24.092Z" transform="translate(-7.254 -6.03)" fill="currentColor"/>
</svg>`

const sun_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="39.962" height="40.005" viewBox="0 0 39.962 40.005">
<path id="Sun" d="M23.993,38.465a1.25,1.25,0,0,1,1.243,1.122l.007.128v3.037a1.25,1.25,0,0,1-2.493.128l-.007-.128V39.715A1.25,1.25,0,0,1,23.993,38.465ZM35.9,34.1l.1.091,2.148,2.148A1.25,1.25,0,0,1,36.478,38.2l-.1-.091-2.148-2.148A1.25,1.25,0,0,1,35.9,34.1Zm-22.14.091a1.25,1.25,0,0,1,.091,1.666l-.091.1L11.608,38.1a1.25,1.25,0,0,1-1.859-1.666l.091-.1,2.148-2.148A1.25,1.25,0,0,1,13.755,34.189ZM24,13.081A10.919,10.919,0,1,1,13.081,24,10.919,10.919,0,0,1,24,13.081Zm0,2.5A8.419,8.419,0,1,0,32.42,24,8.419,8.419,0,0,0,24,15.581Zm18.731,7.207a1.25,1.25,0,0,1,.128,2.493l-.128.007H39.694a1.25,1.25,0,0,1-.128-2.494l.128-.006ZM8.307,22.729a1.25,1.25,0,0,1,.128,2.493l-.128.007H5.27a1.25,1.25,0,0,1-.128-2.494l.128-.006ZM11.506,9.8l.1.091,2.148,2.148A1.25,1.25,0,0,1,12.089,13.9l-.1-.091L9.84,11.663A1.25,1.25,0,0,1,11.506,9.8ZM38.145,9.9a1.25,1.25,0,0,1,.091,1.666l-.091.1L36,13.811a1.25,1.25,0,0,1-1.859-1.666l.091-.1L36.377,9.9A1.25,1.25,0,0,1,38.145,9.9ZM24,4A1.25,1.25,0,0,1,25.244,5.12l.006.128V8.285a1.25,1.25,0,0,1-2.493.128l-.007-.128V5.248A1.25,1.25,0,0,1,24,4Z" transform="translate(-4.02 -3.998)" fill="currentColor"/>
</svg>`

// Set volume counter

function setVolume() {
    const slider = document.querySelector('.flyout input[type="range" i].slider');
    document.querySelector('.flyout .volume').innerHTML = slider.value;
    // add a leading zero for single-digit numbers
    if (slider.value.length === 1) {
        document.querySelector('.flyout .volume').innerHTML = `0${slider.value}`;
    }
    // if the volume is 0 change the icon to muted speaker
    if (slider.value === '0') {
        document.querySelector('.mdl2-icon').innerText = ''; // muted
    }
    // else, return the icon to normal speaker
    else {
        document.querySelector('.mdl2-icon').innerText = ''; // playing
    }
    // console.log(`Volume is now set to ${slider.value}.`);
}

// Toggle theme

let isDarkmode;
function toggleTheme() {
    document.documentElement.classList.toggle('darkmode');
    if (isDarkmode)
        document.getElementById('toggle-theme').innerHTML = sun_svg;
    else
        document.getElementById('toggle-theme').innerHTML = moon_svg;

    isDarkmode = !isDarkmode;
    // Save user preference into localstorage
    localStorage.setItem('isDarkmode', isDarkmode);
}

// Wait until elements are loaded

window.addEventListener('DOMContentLoaded', (event) => {
    // Set and watch system-prefered theme (based on snippet from https://www.abitofaccess.com/toggle-dark-mode-by-user-preference)
    let colorScheme_query = window.matchMedia('(prefers-color-scheme: dark)');
    function getPrefersColorScheme(query) {
        if (query.matches) {
            // A dark color scheme preference is set so we add the class from our html element
            document.documentElement.classList.add('darkmode');
            document.getElementById('toggle-theme').innerHTML = moon_svg;
            isDarkmode = true;
        } else {
            // No dark color scheme preference is set so we remove the class from our html element
            document.documentElement.classList.remove('darkmode');
            document.getElementById('toggle-theme').innerHTML = sun_svg;
            isDarkmode = false;
        }
    }
    getPrefersColorScheme(colorScheme_query);
    colorScheme_query.addListener(getPrefersColorScheme);
    
    if(localStorage.getItem("isDarkmode") !== null){
        if(JSON.parse(localStorage.getItem('isDarkmode'))){
            isDarkmode = true;
            document.documentElement.classList.add('darkmode');
            document.getElementById('toggle-theme').innerHTML = moon_svg;
        }else{
            isDarkmode = false;
            document.documentElement.classList.remove('darkmode');
            document.getElementById('toggle-theme').innerHTML = sun_svg;
        }
    }

    const sliderInputComponent = document.querySelector('.flyout input[type="range" i]');

    // Set volume
    let isMuted = false;
    
    setVolume();
    sliderInputComponent.addEventListener('input', event => {
        isMuted = false;
        setVolume();
    });

    // Mute when speaker is clicked
    let previousValue = 0;
    const speakerButton = document.getElementsByClassName('mute-button')[0];
    speakerButton.addEventListener('click', event => {
        if (isMuted) {
            slider.value = previousValue;
            previousValue = 0;
        }
        else {
            previousValue = slider.value;
            slider.value = 0;
        }
        isMuted = !isMuted;
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

    // Detect mobile safari (cringe)
    if (window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) {
        let style = document.createElement('style');
        style.innerText = 
       `.acrylic-material::before { opacity: 0.2; }
        html .acrylic-material::before { background: #fff; }
        html.darkmode .acrylic-material::before { background: #000; }`.replace(/\n/g, ' ');
        document.getElementsByTagName("head")[0].appendChild(style);
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
