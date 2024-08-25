function adjustFontSize(text, containerWidth, minFontSize, maxFontSize) {
    // Calculate the scaling factor based on the container width and text length
    var scalingFactor = containerWidth / text.length;
    
    // Adjust the font size within the specified range
    var newSize = Math.max(minFontSize, Math.min(maxFontSize, scalingFactor));

    return newSize * 2;
}

var isBold = false;

function toggleBold() {
    isBold = !isBold;
    applyInput();
}

function applyInput() {
    var userInput = document.getElementById('user-input').value;
    var containerWidth = document.getElementById('display').offsetWidth;
    var containerHeight = document.getElementById('display').offsetHeight;
    var minFontSize = 60;
    var maxFontSize = 900;
    var bgColor = document.getElementById('bgColor').value;
    var color1 = document.getElementById('color1').value;
    var color2 = document.getElementById('color2').value;
    var color3 = document.getElementById('color3').value;
    var gradientStyle = document.getElementById('gradientStyle').value;
    var fontStyle = document.getElementById('fontStyle').value;
    
    var canvas = document.getElementById('textCanvas');
    var context = canvas.getContext('2d');
    
    canvas.width = containerWidth * 2;
    canvas.height = containerHeight * 2;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    var fontSize = adjustFontSize(userInput, containerWidth, minFontSize, maxFontSize);
    context.font = `${fontSize}px ${fontStyle}`;
    
    if (isBold) {
        context.font = `bold ${fontSize}px ${fontStyle}`;
    }
    
    var gradient;
    switch (gradientStyle) {
        case 'to bottom':
            gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            break;
        case 'to top':
            gradient = context.createLinearGradient(0, canvas.height, 0, 0);
            break;
        case 'to right':
            gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            break;
        case 'to left':
            gradient = context.createLinearGradient(canvas.width, 0, 0, 0);
            break;
        default:
            gradient = context.createLinearGradient(0, 0, canvas.width, 0); // Default to 'to right'
            break;
    }
    
    gradient.addColorStop(0.2, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1.0, color3);
    
    context.fillStyle = gradient;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
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

window.addEventListener('resize', function() {
    applyInput();
});

function adjustMaxLength() {
    var userInput = document.getElementById('user-input');
    userInput.setAttribute('maxlength', window.innerWidth <= 768 ? 9 : 28);
}

window.addEventListener('DOMContentLoaded', adjustMaxLength);
window.addEventListener('resize', adjustMaxLength);
