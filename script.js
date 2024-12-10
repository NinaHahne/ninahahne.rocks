// Rotating Wheel:
const wheel = document.querySelector('.wheel-wrapper');
const SPEED = 1;
let progress = 0.5; // 0-1 change while scrolling
let wheelRotation = -360 * Math.min(1, progress * SPEED); // deg

// TODO:
// wheel.style.setProperty('--wheelRotation', wheelRotation+'deg');