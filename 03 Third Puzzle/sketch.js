/* Creation & Computation
Experiment 2, Multiscreen
Group B: "Where's Tiger?" Game 3
Group members: Aranya, Yu, Aishwarya, Jessica

This code was written as part of a group experience for 12 or more mobile phones to look for a lost dog named Tiger.

This is game 3 which displays a word on but outside the bounds of the phone screen. Participants must move their phones to reveal the word, save it by taking a screenshot and then combine it into a larger sentance in order to find the dog.

This code uses the iOS sensor access code (with accompanying permissions.js file) shared by Nicholas Puckett in Creation & Computation, Digital Futures, M.Des, 2023-2025
 
Help was taken from ChatGPT to debug problems and comment the code.
*/

let isMobile = false;
let img; // Image holder
let images = []; // Image holder array
let currentImageIndex = 0;
let imgPositionX;
let imgPositionY;
let sensitivityX = 12; // Adjust this value for sensitivity in the X direction
let sensitivityY = 4; // Adjust this value for sensitivity in the Y direction
let rectangles = []; // Rectangle overlay for images (supposed to be transleucent, intended to allow clicks on the rectangle to freeze the word on the screen; not used in this iteration)
let currentRectangleIndex = 0;
let margin = 24; // Margin for rectangle overlays
let isMovementEnabled = true; // Variable to control movement

let debugShow = true; // boolean for showing debug information

function preload() {
  
// for loop to preload images
  
for (let i = 0; i < 12; i++) {
  // console.log('images/WORD0' + (i+1) + '.png'); // log image preload filenames to console for debugging (used since P5 was not preloading images in the for loop, known P5/js bug)
   images[i] = loadImage('images/WORD0' + (i+1) + '.png');
  }
      
  // preloading font
  myFont1 = loadFont("fonts/Brown-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  rectMode(CENTER);

  // Check if movement is enabled
  if (isMovementEnabled) {
    imgPositionX = map(rotationY, 90, 0, 0, 300, false);
    imgPositionY = map(rotationX, 180, -180, -1800, 1800, false);
  }
  else if(!isMovementEnabled){
    imgPositionX = 0;
    imgPositionY = 0;
  }

  // To enable access to sensors. 
  checkSensorPermissions();
  
  // event listener to enable touch on iOS Safari
  
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

function draw() {
  
  background(255);

  if (isMovementEnabled) { // Check if movement is enabled
    imgPositionX = map(rotationY, 90, 0, 0, 300, false); // map imgPositionX to phone sensor rotationY values
    imgPositionY = map(rotationX, 180, -180, -1800, 1800, false); // map imgPositionY to phone sensor rotationX values
    imgPositionX = rotationY; // assign rotationY to imgPositionX
    imgPositionY = rotationX; // assign rotationX to imgPositionY 
  }


// displaying the images and then changing their position based on rotationX and rtationY values:
 image(
    images[currentImageIndex],
    (windowWidth/2) + (imgPositionX * sensitivityX),
    ((windowHeight/2)) + (imgPositionY * sensitivityY),
    images[currentImageIndex].width/3,
    images[currentImageIndex].height/3
  );

  // displaying text for user info
  fill(0);
  textSize(15);
  textFont(myFont1);

  textAlign(CENTER);
  text("Move your phone to search for your word.", width / 2, height - 70);
    
  text("Tap a blank area to look for a new word.", width / 2, height - 37);

  text("When you've found your word, take a screenshot!", width/2, height - 15);

  // display text on screen for debug information
  if (debugShow) {
    
    fill(255, 0)
    
    textAlign(LEFT);

    // text("X: " + int(rotationX), 15, height - 75);

    textAlign(CENTER);

    // text("Y: " + int(rotationY), width / 2, height - 75);

    textAlign(RIGHT);

    // text("Z: " + int(rotationZ), width - 15, height - 75);

    // printing values for imgX and imgY

    textAlign(LEFT);

    text("imgX: " + int(windowWidth / 2 + imgPositionX * sensitivityX),
      15,
      height - 110
    );

    textAlign(RIGHT);

    text("imgY: " + int(windowHeight / 2 - 50 + imgPositionY * sensitivityY),
      width - 15,
      height - 110
    );
  }
  
  // fill('red');
  // initializeRectangles();
  // displayCurrentRectangle();
  handleTouch();
  
  // button = createButton('Stop Moving');
  // button.position(width/2 + 155, height - 30);
  // button.mousePressed(isMovementEnabled = !isMovementEnabled);
  
  // rectangles.mousePressed(isMovementEnabled = !isMovementEnabled);

  if (!isMovementEnabled){
    text("Move Disabled", width/2, height/2);
  }
}

// initializing rectangle overlays intended to "freeze" words on the screen; not used in this iteration of the code, but useful for later. Based off of the current word being displayed and its location

function initializeRectangles() {
  // Define an array of objects, each specifying the properties of a rectangle
  // This took forEVER to do!
  // do NOT mess with this!
  rectangles = [
    { x: windowWidth/2 - 504, y: windowHeight/2 + 72, width: 75 + margin, height: 42 + margin },
    { x: windowWidth/2 + 562, y: windowHeight/2 - 102, width: 156 + margin, height: 55 + margin },
    { x: windowWidth/2 - 232, y: windowHeight/2 + 235, width: 100 + margin, height: 55 + margin },
    { x: windowWidth/2 - 687, y: windowHeight/2 - 252, width: 159 + margin, height: 50 + margin },
    { x: windowWidth/2 + 155 + 72, y: windowHeight/2 - 140 + 25, width: 144 + margin, height: 50 + margin },
    { x: windowWidth/2 + 366 + 97.5, y: windowHeight/2 - 301 + 25, width: 195 + margin, height: 50 + margin },
    { x: windowWidth/2 + 192 + 90.5, y: windowHeight/2 + 163 + 25, width: 181 + margin, height: 50 + margin },
    { x: windowWidth/2 - 860 + 62, y: windowHeight/2 - 293 + 25, width: 124 + margin, height: 50 + margin },
    { x: windowWidth/2 - 528 + 28.5, y: windowHeight/2 + 155 + 25, width: 57 + margin, height: 50 + margin },
    { x: windowWidth/2 + 282 + 16, y: windowHeight/2 + 166 + 25, width: 32 + margin, height: 50 + margin },
    { x: windowWidth/2 - 525 + 68, y: windowHeight/2 - 144 + 25, width: 136 + margin, height: 50 + margin },
    { x: windowWidth/2 + 423 + 32.5, y: windowHeight/2 + 143 + 25, width: 65 + margin, height: 50 + margin }
  ];
}

// function to display rectangles based on the current word and its location
function displayCurrentRectangle() {
  let rectInfo = rectangles[currentRectangleIndex];
  fill(255, 0, 0, 0); // transparent red fill color
  rect(rectInfo.x + (imgPositionX * sensitivityX), rectInfo.y + (imgPositionY * sensitivityY), rectInfo.width, rectInfo.height);
  fill(0);
}

function handleTouch(touchX, touchY) {
  // Check which rectangle was touched
    for (let i = 0; i < rectangles.length; i++) {
      let rectInfo = rectangles[i];
    if (
      touchX >= (rectInfo.x + (imgPositionX * sensitivityX) - (rectInfo.width/2)) &&
      touchX <= (rectInfo.x + (imgPositionX * sensitivityX) + (rectInfo.width/2)) &&
      touchY >= (rectInfo.y + (imgPositionY * sensitivityY) - (rectInfo.height/2)) &&
      touchY <= (rectInfo.y + (imgPositionY * sensitivityY) - (rectInfo.height/2))
    ) {
      isMovementEnabled = !isMovementEnabled;
      currentRectangle = i;
      displayCurrentRectangle();
      break;    
      }
  }              
}

function mousePressed() {
  if (!isMobile) {
    changeImage();
  }
}

// function to change the current word being displayed on screen
function changeImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }

  currentRectangleIndex++;
  if (currentRectangleIndex >= rectangles.length) {
    currentRectangleIndex = 0;
  }

  // console log information to help debugging
  console.log("Image Number: " + currentImageIndex);
  console.log("Rect Number: " + currentRectangleIndex);
}
