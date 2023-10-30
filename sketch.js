let instruction = true;

function setup() {
    createCanvas(600, 200);
}
  
function draw() {
    background('rgb(204,255,255)');

    if(instruction) {
        textSize(20);
        fill(0);
        noStroke();  // No outline around the text
        textAlign(CENTER, CENTER);
        text("We've almost found Tiger!", width/2, 50);
        text("Use all your clues to locate him.", width/2, 80);
    }   
}
