// Rotating Wheel:
const SPEED = 1; // Speed multiplier for rotation
const INITIAL_ROTATION = -29; // Starting rotation of the wheel in degrees

const wheel = document.querySelector('.wheel-wrapper');
const spacer = document.querySelector('.spacer'); // Element to track scroll progress

const effectAlreadyOnMouseEnter = false;

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

document.querySelectorAll('.img-box.snow').forEach((imgBox) => {
    let lastTriggered = 0; // To throttle the effect
    const triggerEffect = () => {
        const now = Date.now();
        if (now - lastTriggered < 1000) return; // Throttle effect
        lastTriggered = now;

        const dataImages = imgBox.getAttribute('data-images');
        if (!dataImages) {
            console.warn('Missing data-images attribute on', imgBox);
            return;
        }

        try {
            const images = JSON.parse(dataImages);
            if (!Array.isArray(images) || images.length === 0) {
                console.warn('data-images is not a valid array or is empty', imgBox);
                return;
            }

            // Generate random positions for each image
            const usedPositions = [];
            const getRandomPosition = () => {
                let position;
                do {
                    position = Math.random() * 100;
                } while (usedPositions.some((p) => Math.abs(p - position) < 10));
                usedPositions.push(position);
                return position;
            };

            // Trigger effect for images
            images.forEach((imageSrc, index) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.className = 'snowflake';
                img.style.left = `${getRandomPosition()}%`;
                img.style.animationDuration = `${3 + Math.random() * 2}s`;
                img.style.animationDelay = `${index * 0.5}s`;

                document.querySelector('#effects').appendChild(img);
                img.addEventListener('animationend', () => img.remove());
            });
        } catch (error) {
            console.error('Invalid JSON or other error in data-images attribute:', error);
        }
    };

    // Detect whether a mouse is present
    if (effectAlreadyOnMouseEnter && window.matchMedia('(pointer: fine)').matches) {
        // Mouse is present: use hover
        imgBox.addEventListener('mouseenter', triggerEffect);
    } else {
        // No mouse (likely touch device): use click/tap
        imgBox.addEventListener('click', triggerEffect);
    }
});

