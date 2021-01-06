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

function toggleTheme() {
    // console.log('Theme toggled.');
    const flyout = document.querySelector('.flyout');
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
    flyout.classList.toggle('theme-light');
    flyout.classList.toggle('theme-dark');
    document.getElementById('toggle-theme').classList.toggle('selected');
}

// Wait until elements are loaded

window.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.querySelector('.flyout input[type="range" i].slider');

    // Set volume
    slider.value = '50'; // Hack to prevent firefox from caching slider values
    setVolume();
    slider.addEventListener('input', event => {
        slider.style.backgroundImage = `linear-gradient(to right, #0078d7 0%, rgb(var(--accent-color)) ${slider.value}%, rgba(var(--primary-color-invert), var(--slider-secondary-opacity)) ${slider.value}%, rgba(var(--primary-color-invert), var(--slider-secondary-opacity)) 100%)`;
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
});