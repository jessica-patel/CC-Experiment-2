// Register a custom A-Frame component to handle marker detection
AFRAME.registerComponent('animated-marker', {
    init: function () {
        var el = this.el;
        // This function will be called when the marker is found.
        el.addEventListener('markerFound', function () {
        console.log('Custom marker found!');
        // Perform actions or animations here
        });

        // This function will be called when the marker is lost.
        el.addEventListener('markerLost', function () {
        console.log('Custom marker lost!');
        // Handle marker lost event
        });
    }
    });

// Trigger audio playback when marker is detected
marker.addEventListener('markerFound', function () {
    var audioElement = document.getElementById('audioElement');
    audioElement.play();
  });

// Add event listener for marker detection
document.querySelector('a-marker[type="pattern"][url="shiba.patt"]').addEventListener('markerFound', function () {
    var audioElement = document.getElementById('audioElement');
    audioElement.play();
  });
