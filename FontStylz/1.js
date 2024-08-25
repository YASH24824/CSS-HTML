

function adjustFontSize(text, containerWidth, minFontSize, maxFontSize) {
    // Calculate the scaling factor based on the container width and text length
    var scalingFactor = containerWidth / text.length;
    
    // Adjust the font size within the specified range
    var newSize = Math.max(minFontSize, Math.min(maxFontSize, scalingFactor));

    return newSize * 2;
}
// Variable to track bold toggle state
var isBold = false;

function toggleBold() {
    // Toggle the state
    isBold = !isBold;
    // Apply the bold class to the textCanvas
    applyInput();
}function applyInput() {
    var userInput = document.getElementById('user-input').value;
    var bgColor = document.getElementById('bgColor').value;
    var color1 = document.getElementById('color1').value;
  
    var fontStyle = document.getElementById('fontStyle').value;

    var containerWidth = document.getElementById('display').offsetWidth;
    var containerHeight = document.getElementById('display').offsetHeight;
    var minFontSize = 60;
    var maxFontSize = 900;

    // Calculate font size based on adjusted function
    var fontSize = adjustFontSize(userInput, containerWidth, minFontSize, maxFontSize);

    var canvas = document.getElementById('textCanvas');
    var context = canvas.getContext('2d');

    canvas.width = containerWidth * 2;
    canvas.height = containerHeight * 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Apply background color to the display area
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    context.font = `${fontSize}px ${fontStyle}`;

    // Apply bold style if enabled
    if (isBold) {
        context.font = `bold ${fontSize}px ${fontStyle}`;
    }

    // Set text color
    context.fillStyle = color1;

    // Center align text
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Draw text in the center of the canvas
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.fillText(userInput, x, y);
}


function downloadImage() {
    var canvas = document.getElementById('textCanvas');
    var img = canvas.toDataURL('image/png');

    var a = document.createElement('a');
    a.href = img;
    a.download = 'FontStylz.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Resize canvas on window resize
window.addEventListener('resize', function() {
    applyInput();
});

// Adjust maxlength of user-input based on viewport width
function adjustMaxLength() {
    var userInput = document.getElementById('user-input');
    if (window.innerWidth <= 768) {
        userInput.setAttribute('maxlength', 9); // Adjust maxlength for smaller screens
    } else {
        userInput.setAttribute('maxlength', 28); // Default maxlength for larger screens
    }
}

// Call adjustMaxLength on page load and resize
window.addEventListener('DOMContentLoaded', adjustMaxLength);
window.addEventListener('resize', adjustMaxLength);

  