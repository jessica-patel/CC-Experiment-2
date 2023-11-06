// Creation & Computation 2023: Puzzle Paws Where is Tiger?
// Experiment 2, Multiscreen. Game 1.
// Group D: Aishwarya Bhattbhatt, Aranya Khurana, Jessica Patel, Yu-Shien Yang
// This code was written as part of a group experience for 12 or more mobile phones to look for a lost dog named Tiger. In the first game, there's a dynamic puzzle where pieces change based on screen touches. By collaborating, players can complete the puzzle and unlock clues for the second stage. 
//Help was also taken from ChatGPT to debug problems. Especially with Safari and the image dimension issues.

//Variable declarations
let possible_images;
let loaded_images = []; // Store the pre-loaded images
let currentImage;
let backgroundColor;
let isMobile = false;
let imgWidth;
let imgHeight;

// List of image filenames
function preload() {
  possible_images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
  ];

  // Loop through filenames and preload each image, storing them in loaded_images
  for (let i = 0; i < possible_images.length; i++) {
    loaded_images[i] = loadImage(possible_images[i]);
  }

  // Selecting a random image to be the currentImage when the sketch starts
  const randomIndex = floor(random(loaded_images.length));
  currentImage = loaded_images[randomIndex];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(255);

  imgWidth = width; // Set the image width to screen width
  imgHeight = height; // Set the image height to screen height

  if ("ontouchstart" in window) {
    isMobile = true;
    canvas.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        changeImage();
      },
      false
    );
  }
}

// Set the background and display the current image
function draw() {
  background(backgroundColor);
  image(currentImage, 0, 0, imgWidth, imgHeight);
}

function mousePressed() {
  if (!isMobile) {
    changeImage();
  }
}

// Change to a random image from the loaded images
function changeImage() {
  const randomIndex = floor(random(loaded_images.length));
  currentImage = loaded_images[randomIndex];
  redraw();
}
