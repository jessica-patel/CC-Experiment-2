/* Creation & Computation
Experiment 2, Multiscreen
Group B: "Where's Tiger?" Game 2
Group members: Aranya, Yu, Aishwarya, Jessica

This code was written as part of a group experience for 12 or more mobile phones to look for a lost dog named Tiger.

This is game 2 which displays a word in the center of the phone screen. Participants must keep their phones on a flat surface and rotate to reveal one of twelve different words, save it by tapping the screen and then combine it into a larger sentance in order to find the dog.

This code uses the iOS sensor access code (with accompanying permissions.js file) shared by Nicholas Puckett in Creation & Computation, Digital Futures, M.Des, 2023-2025
 
Help was taken from ChatGPT to debug problems.
*/

let sentence = "trail, went. a Follow dog's it find footprints, the where muddy discover"; // jumbled sentence with "intentionally random" word order
let sentence1 = "Follow a muddy trail, discover the dog's footprints, find where it went."; // original sentence for reference
let words;
let currentWord = 0;
let rotationEnabled = false; // flag to enable or disable rotation-based word change
let debugShow = false; // boolean to enable/disable debug display on screen
let rotationStorage; // holder for rotation storage

function preload() {
    
  // preloading the fonts
  myFont1 = loadFont("fonts/Brown-Regular.ttf");
  myFont2 = loadFont('fonts/Brown-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // split the sentence into words
  words = sentence.split(' ');

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

  // Display text for user info and debugging
  fill(0);
  textSize(15);
  textFont(myFont1);
  
  if (rotationEnabled) {
    
    // Calculate the index of the word to display based on rotationZ
    
    let rotationZMapped = map(rotationZ, 330, 30, 0, words.length);
    currentWord = int(constrain(rotationZMapped, 0, words.length - 1));
    
  // display text for user info
  translate(0, 0);
  rotate(0);
  textSize(15);
  textAlign(CENTER);
  text("Lay your phone on a flat surface", width / 2, height - 75);

  text("and rotate to change your word.", width / 2, height - 50);
    
  }
  
  rotate(0);

  // display text for on-screen debug info
  if (debugShow) {
    textAlign(CENTER);

    text("Tap to Freeze Word", width / 2, height - 15);

    textAlign(LEFT);

    // text("X: " + int(rotationX), 15, height - 75);

    textAlign(CENTER);

    // text("Y: " + int(rotationY), width / 2, height - 75);

    textAlign(RIGHT);

    // text("Z: " + int(rotationZ), width - 15, height - 75);


  } else {
    textAlign(CENTER);

    text("You've picked this word.", width / 2, height - 75);
    
    text("Make sure no one else has it.", width / 2, height - 50);
    
    text("Tap again to enable word selection", width / 2, height - 15);
    
  }
  
  // Display the selected word in the center of the screen
  // push to generate new frame reference for rotation
  push();
  textFont(myFont2);
  textSize(72);
  textAlign(CENTER, CENTER);
  translate(width/2, height/2),
  angleMode(DEGREES);
  
  
  if(rotationEnabled){
    rotate(int(rotationZ)); // uncomment for text that rotates with phone
    rotationStorage = rotationZ; // storing rotationZ angle (but only when the phone rotation is enabled)
  }
  else{
      rotate(int(rotationStorage));
  }
  text(words[currentWord], 0, 0);
  pop();
  // pop to restore the frame for rest of the sketch
  
}


function touchStarted() {
  debugShow = !debugShow;
  rotationEnabled = !rotationEnabled; // Toggle rotationEnabled on mouse click
}

function mouseClicked() {

}

function mousePressed() {

}
