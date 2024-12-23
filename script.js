// Rotating Wheel:
const SPEED = 1; // Speed multiplier for rotation
const INITIAL_ROTATION = -29; // Starting rotation of the wheel in degrees

const wheel = document.querySelector('.wheel-wrapper');
const spacer = document.querySelector('.spacer'); // Element to track scroll progress

// Function to calculate scroll progress based on the spacer element
function getScrollProgress() {
    const spacerRect = spacer.getBoundingClientRect();
    const spacerHeight = spacerRect.height;
    const windowHeight = window.innerHeight;
    const spacerTop = Math.max(0, -spacerRect.top);
    const progress = Math.min(1, spacerTop / (spacerHeight - windowHeight));
    return progress;
}

window.addEventListener('scroll', () => {
    const progress = getScrollProgress();
    const wheelRotation = -360 * progress * SPEED + INITIAL_ROTATION; // Calculate rotation
    wheel.style.setProperty('--wheelRotation', `${wheelRotation}deg`); // Update CSS variable
});

