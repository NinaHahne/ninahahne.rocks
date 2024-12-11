// Rotating Wheel:
const wheel = document.querySelector('.wheel-wrapper');
const SPEED = 1;
const initialRotation = -29;
let progress = 0; // 0-1 change while scrolling

// progress should be 0 when scrolled to the top and 1 when scrolled to the bottom:
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    progress = scrollTop / (scrollHeight - clientHeight);
    
    let wheelRotation = -360 * Math.min(1, progress * SPEED) + initialRotation; // deg
    wheel.style.setProperty('--wheelRotation', wheelRotation+'deg');
});
