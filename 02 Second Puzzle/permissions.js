/*
Functions that enable sensor access on IOS
The functions check to operating system and if it is IOS, draws a button on screen
pressing the button will pop up the dialog to enable access. Press allow

Call the behaviour in setup() using 
checkSensorPermissions();

Based on examples from Kenneth Lim and Ling Dong
https://github.com/processing/p5.js/issues/4750
https://github.com/processing/p5.js/issues/4367#issuecomment-599093466

and extended using GPTv4 September 25, 2023 version
*/

function isIOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

let btn;

function checkSensorPermissions() {
    if (isIOS()) {
        btn = createButton("Request Sensor Access");
        btn.position(windowWidth / 2 - btn.width / 2, windowHeight * 0.75);
        btn.mousePressed(requestMotionPermission);
        //used for debugging
        /*
        background(220);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("This is iOS", windowWidth/2, windowHeight/2);
        */
    } else {
      //used for debugging
      /*
        background(220);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("This is NOT iOS", windowWidth/2, windowHeight/2);
        */
    }
}

function requestMotionPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    console.log("Motion permission granted");
                } else {
                    console.log("Motion permission denied");
                }
                btn.remove();
            })
            .catch(error => {
                console.error("Error requesting motion permission", error);
                btn.remove();
            });
    }
}
