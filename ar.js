// Register a custom A-Frame component to handle marker detection
AFRAME.registerComponent('custom-marker', {
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
