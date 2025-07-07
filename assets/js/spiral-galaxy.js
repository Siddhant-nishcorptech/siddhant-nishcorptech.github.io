// Get the container div for the canvas
const container = document.getElementById('spiral-galaxy');
let canvas;
let ctx;

// --- Configuration ---
const numStars = 2000; // Number of stars/dots
const starColor = 'rgba(161, 162, 179, 0.72)';
const maxStarSize = 2; // Maximum size of a star
const minStarSize = 0.05; // Minimum size of a star
const swirlSpeed = 0.009; // Speed of the swirl (radians per frame)
const maxDistance = 1000; // Maximum distance from the center for a star
const minDistance = 10; // Minimum distance from the center for a star

// --- Helper Functions ---

// Function to get a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to get the canvas center coordinates
function getCanvasCenter() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
}

// --- Star Class ---
// A class to represent each star/dot in the galaxy
class Star {
    constructor() {
        this.reset();
    }

    // Reset a star's position and properties
    reset() {
        const angle = random(0, Math.PI * 2);
        this.distance = random(minDistance, maxDistance);
        this.x = Math.cos(angle) * this.distance;
        this.y = Math.sin(angle) * this.distance;
        this.size = random(minStarSize, maxStarSize);
        this.angle = angle;
        // Speed depends on distance from center for a more realistic swirl
        this.speed = swirlSpeed * (this.distance / maxDistance) * random(0.5, 1.5); 
    }

    // Update the star's position
    update() {
        this.angle += this.speed;
        this.x = Math.cos(this.angle) * this.distance;
        this.y = Math.sin(this.angle) * this.distance;
    }

    // Draw the star on the canvas
    draw(centerX, centerY) {
        ctx.beginPath();
        ctx.arc(centerX + this.x, centerY + this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();
    }
}

// --- Animation Logic ---

// Array to hold all the stars
let stars = [];
let animationFrameId; // To store the requestAnimationFrame ID

// Initialize the stars
function initStars() {
    // Clear existing particles if re-initializing on resize
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

// Animation loop using requestAnimationFrame for smoothness
function animate() {
    // Clear the canvas on each frame with a semi-transparent black to create a trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get the center of the canvas
    const center = getCanvasCenter();

    // Update and draw each star
    stars.forEach(star => {
        star.update();
        star.draw(center.x, center.y);

        // If a star goes too far, reset it to the center to keep the animation going
        const distanceToCenter = Math.sqrt(star.x * star.x + star.y * star.y);
        if (distanceToCenter > maxDistance * 1.5) { // Reset if it goes beyond 1.5 times maxDistance
            star.reset();
        }
    });

    // Request the next animation frame
    animationFrameId = requestAnimationFrame(animate);
}

// --- Event Listeners and Initial Setup ---

// Function to setup/resize the canvas and initialize stars
function setupCanvasAndGalaxy() {
    if (!container) {
        console.error("Spiral galaxy container element not found!");
        return;
    }

    // Clear any existing canvas elements within the container
    container.innerHTML = ""; 

    // Create the canvas element if it doesn't exist or if container was cleared
    canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.width = "100%"; 
    canvas.style.height = "100%"; 
    container.appendChild(canvas);
    
    ctx = canvas.getContext("2d");

    // Set canvas dimensions to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear previous animation frame if it exists
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    initStars(); // Re-initialize stars for the new canvas size
    animate(); // Start the animation loop
}

// Initial setup when the window loads
window.addEventListener('load', setupCanvasAndGalaxy);

// Re-setup on window resize
window.addEventListener('resize', setupCanvasAndGalaxy);