
// Task 2 - Configure the JavaScript for Drawing Context

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");


const clearButton = document.getElementById("clear");
const colorPicker = document.getElementById("color");
const shapeChoices = document.getElementsByName("shape");

let isDrawing = false;
let startX, startY; // Coordinates where drawing starts

// Function to get mouse position on the canvas
function getMousePosition(event) {
    return [event.offsetX, event.offsetY];
}

// Start drawing when mouse is pressed down
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    [startX, startY] = getMousePosition(event);
});

// Drawing as the mouse moves, only if drawing is active
canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) return; // Only proceed if mouse is down (drawing)

    const [currentX, currentY] = getMousePosition(event);

    // Clear the canvas for smooth drawing effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing the selected shape
    drawShape(currentX, currentY); 
}); 

// Finish drawing when mouse is released
canvas.addEventListener("mouseup", (event) => {
    if (isDrawing) {
        const [endX, endY] = getMousePosition(event);
        drawShape(endX, endY); // Finalize the shape
        isDrawing = false;
    }
});

// Stop drawing if mouse leaves the canvas
canvas.addEventListener("mouseout", () => {
    isDrawing = false;
    ctx.closePath(); // Close the path to prevent unexpected shapes
});



// Task 3 
// Function to draw the selected shape based on mouse coordinates
function drawShape(mouseX, mouseY) {
    const selectedShape = getSelectedShape(); 
    const color = colorPicker.value; 

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    if (selectedShape === "line") {
        ctx.moveTo(startX, startY); // Start line at initial mouse position
        ctx.lineTo(mouseX, mouseY); // End line at current mouse position

    } else if (selectedShape === "rectangle") {
        ctx.rect(startX, startY, mouseX - startX, mouseY - startY); 

    } else if (selectedShape === "circle") {
        const radius = Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2); // Draw circle
    }
    ctx.stroke();
    ctx.closePath();
}

// Function to get the selected shape from the shapeChoices options
function getSelectedShape() {
    for (const option of shapeChoices) {
        if (option.checked) {
            return option.value; // Returns the value of the selected shape
        }
    }
}



// Task 4: Clear the canvas when the clear button is clicked
clearButton.addEventListener("click", clearCanvas);

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
}

// Function to get the mouse position relative to the canvas
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
}