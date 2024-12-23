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

document.querySelectorAll('.img-box.rain').forEach((imgBox) => {
    let lastTriggered = 0; // To throttle the effect
    try {
        const dataImages = imgBox.getAttribute('data-images');
        if (!dataImages) {
            console.warn('Missing data-images attribute on', imgBox);
            return;
        }

        const images = JSON.parse(dataImages);

        if (!Array.isArray(images) || images.length === 0) {
            console.warn('data-images is not a valid array or is empty', imgBox);
            return;
        }

        imgBox.addEventListener('mouseenter', () => {
            const now = Date.now();
            // Trigger the effect only if 1 second has passed since the last trigger
            if (now - lastTriggered < 1000) return;
            lastTriggered = now;

            // Generate random positions for each image
            const usedPositions = []; // To track used positions
            const getRandomPosition = () => {
                let position;
                do {
                    position = Math.random() * 100; // Random position between 0% and 100%
                } while (usedPositions.some((p) => Math.abs(p - position) < 10)); // Ensure no overlap (min 10% apart)
                usedPositions.push(position);
                return position;
            };

            // Loop through each image in the data-images array
            images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.className = 'rain-image';

                // Assign a unique random position
                img.style.left = `${getRandomPosition()}%`;

                // Add animation delay based on the index
                img.style.animationDelay = `${index * 0.2}s`;

                document.querySelector('#rain').appendChild(img);

                // Remove the image after the animation ends
                img.addEventListener('animationend', () => img.remove());
            });
        });
    } catch (error) {
        console.error('Invalid JSON or other error in data-images attribute:', error);
    }
});
