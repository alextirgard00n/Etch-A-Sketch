const colorBtn = document.querySelector('.colorBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const clearBtn = document.querySelector('.clearBtn');
const colorPicker = document.querySelector('.colorPicker');
const sizeValue = document.querySelector('.sizeValue');
const sizeSlider = document.querySelector('.sizeSlider');
const container = document.querySelector('.container');

let value = sizeSlider.value;
let currentMode = 'color';

colorPicker.oninput = (e) => runButton(colorBtn, 'color')
colorBtn.onclick = () => runButton(colorBtn, 'color');
rainbowBtn.onclick = () => runButton(rainbowBtn, 'rainbow');
eraserBtn.onclick = () => runButton(eraserBtn, 'eraser');
// clearBtn.addEventListener('click', makeGridSize);

clearBtn.addEventListener('click', () => {
    makeGridSize();
    clearBtn.classList.add('active');
    clearBtn.classList.remove('active');
});

sizeSlider.onmousemove = (e) => sliderValueText(e.target.value);
sizeSlider.onchange = (e) => sliderValue(e.target.value);

function sliderValueText() { //changes text with slider
    value = sizeSlider.value;
    sizeValue.innerHTML = `${value} x ${value}`;
    // makeGridSize();
}

function sliderValue() { //sends final click
    value = sizeSlider.value;
    sizeValue.innerHTML = `${value} x ${value}`;
    makeGridSize();
}

function makeGridSize() {
    container.style.gridTemplateColumns = `repeat(${value}, 1fr)`
    container.style.gridTemplateRows = `repeat(${value}, 1fr)`
    clearGrid();
    for (let i = 0; i < value * value; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColorGrid)
        gridElement.addEventListener('mousedown', changeColorGrid)
        container.appendChild(gridElement).className = "gridItem";
    }
}

function changeColorGrid(e) {
    switch (currentMode) {
        case 'color':
            e.target.style.backgroundColor = colorPicker.value;
            break
        case 'rainbow':
            const randomR = Math.floor(Math.random() * 256)
            const randomG = Math.floor(Math.random() * 256)
            const randomB = Math.floor(Math.random() * 256)
            e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            break
        case 'eraser':
            e.target.style.backgroundColor = '';
            break
    }
}

function clearGrid() {
    container.innerHTML = '';
}

function activeButton(isSelected, setCurentMode) {
    colorBtn.classList.remove('active')
    rainbowBtn.classList.remove('active')
    eraserBtn.classList.remove('active')
    isSelected.classList.add('active');
    currentMode = setCurentMode;
}

function runButton(button, currentMode) {
    activeButton(button, currentMode);
}

makeGridSize();
activeButton(colorBtn, currentMode);
