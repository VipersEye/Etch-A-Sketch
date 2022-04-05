let btnModeSwitch = document.querySelector('.app-mode');
let switchGridSize = document.querySelector('.grid-size__input');
let btnRandomColor = document.querySelector('.btn_random-color');
let btnDisplayGrid = document.querySelector('.btn_grid');
let btnColorMix = document.querySelector('.btn_mixing');
let btnEraser = document.querySelector('.btn_eraser');
let btnClear = document.querySelector('.btn_clear');

let colorMain = document.querySelector('.color_first');
let colorPickers = document.querySelectorAll('.color');
let colorCurrent = colorMain.value;

btnModeSwitch.addEventListener('click', modeSwitch);

switchGridSize.addEventListener('input', (evt)=>{
    gridCreate('container_draw', evt.target.value);
});

btnRandomColor.addEventListener('click', btnClassToggle);

btnDisplayGrid.addEventListener('click', gridDisplayChange);

btnColorMix.addEventListener('click', btnClassToggle);

btnEraser.addEventListener('click', eraserSwitching);

btnClear.addEventListener('click', gridClear);

colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('change', currentColorChange);
    colorPicker.addEventListener('click', currentColorChange);
});

equalGridWidth();

gridCreate('container_draw', switchGridSize.value);
gridCreate('container_colors', 8);

function modeSwitch(evt) {
    let btnModeSwitch = evt.currentTarget;
    let circleSumMoon = btnModeSwitch.querySelector('.app-mode__inner');
    blockRotate(circleSumMoon, 180);

    let pixels = document.querySelectorAll('.container_draw .grid .grid__pixel');
    btnModeSwitch.classList.toggle('light-mode');
    btnModeSwitch.classList.toggle('dark-mode');
    let root = document.documentElement.style;
    if (btnModeSwitch.classList.contains('light-mode')) {
        root.setProperty('--main-color', '#000');
        root.setProperty('--secondary-color', '#fff');
    }
    else if (btnModeSwitch.classList.contains('dark-mode')) {
        root.setProperty('--main-color', 'goldenrod');
        root.setProperty('--secondary-color', '#000');
    }

    let color = root.getPropertyValue('--main-color');

    pixels.forEach(pixel => {
        pixel.style.setProperty('border-color', `${color}`);
    });
}

function equalGridWidth() {
    let grid = document.querySelector('.container_draw');
    let height = grid.offsetHeight + 'px';
    grid.style.width = height;
}

function btnClassToggle (evt) {
    evt.target.classList.toggle('btn_off');
    evt.target.classList.toggle('btn_on');
}

function gridDisplayChange(evt) {
    let pixels = document.querySelectorAll('.container_draw .grid .grid__pixel');
    let root = document.documentElement.style;
    let color = root.getPropertyValue('--main-color');
    btnClassToggle(evt);
    if (evt.target.classList.contains('btn_on')) {
        pixels.forEach(pixel => {
            pixel.style.border = '1px solid ' + color;
        });
    }
    else if (evt.target.classList.contains('btn_off')) {
        pixels.forEach(pixel => {
            pixel.style.border = '0px';
        });
    }
}

function currentColorChange(evt) {
    let colorWrappers = document.querySelectorAll('.color');
    if (evt.target.parentElement == colorWrappers[0]) {
        colorWrappers[0].classList.add('color_active');
        colorWrappers[1].classList.remove('color_active');
    }
    else {
        colorWrappers[1].classList.add('color_active');
        colorWrappers[0].classList.remove('color_active');
    } 
    colorCurrent = evt.target.value;
}

function eraserSwitching (evt) {
    btnClassToggle(evt);
    if (evt.target.classList.contains('btn_on')) {
        colorCurrent = 'transparent';
    }
    else if (evt.target.classList.contains('btn_off')) {
        colorCurrent = document.querySelector('.color_active').querySelector('.color-picker').value;
    }
}

function gridCreate (gridType, gridSize){
    let container = document.querySelector(`.${gridType}`);
    let gridCurrent = container.querySelector(`.grid`);
    let gridNew = document.createElement('div');
    let pixelSize = 100/gridSize + '%';
    gridNew.classList.add('grid');
    container.removeChild(gridCurrent);
    for(let i = 0; i < gridSize*gridSize; i++) {
        let pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}; height: ${pixelSize};`;
        pixel.classList.add('grid__pixel');
        gridNew.appendChild(pixel);
    }

    container.appendChild(gridNew);

    if (gridType == 'container_draw') {
        pixelEvent(gridNew);
    }

    else if (gridType == 'container_colors') {

    }
    
}

function pixelEvent(grid) {

    grid.addEventListener('mousedown', (evt)=>{
        pixelFill(evt);
        let pixels = evt.currentTarget.querySelectorAll('.grid__pixel');
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseenter', pixelFill);
        });        
    });

    grid.addEventListener('mouseup', (evt)=>{
        let pixels = evt.currentTarget.querySelectorAll('.grid__pixel');
        pixels.forEach(pixel => {
            pixel.removeEventListener('mouseenter', pixelFill);
        }); 
    });
}

function pixelFill (pixel) {
    if (btnRandomColor.classList.contains('btn_on')) {
        let colorRandom = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        pixel.target.style['background-color'] = colorRandom;
    }

    else if (btnColorMix.classList.contains('btn_on')) {
        pixel.target.style['background-color'] = colorMix(pixel);
    }

    else {
        pixel.target.style['background-color'] = colorCurrent;
    }
}

function colorMix (pixel) {
    if (pixel.target.style.backgroundColor && pixel.target.style.backgroundColor != 'transparent') {
        let colorPixel = pixel.target.style.backgroundColor.slice(4,-1);
        let pixelRGB = colorPixel.split(',');
        let pixelR = +pixelRGB[0];
        let pixelG = +pixelRGB[1].trim();
        let pixelB = +pixelRGB[2].trim();

        let currentR = parseInt(colorCurrent.substr(1,2),16);
        let currentG = parseInt(colorCurrent.substr(3,2),16);
        let currentB = parseInt(colorCurrent.substr(5,2),16);

        let colorMixed = `rgb(${(pixelR + currentR)/2}, ${(pixelG + currentG)/2}, ${(pixelB + currentB)/2})`;

        return colorMixed;
    }

    else {
        return colorCurrent;
    }
}

function gridClear() {
    let pixels = document.querySelectorAll('.grid__pixel');
    pixels.forEach(pixel => {
        pixel.style['background-color'] = 'transparent';
    });
}

function iconsRotate(){
    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon=>{
        blockRotate(icon, 0.5);
    });
    setTimeout(iconsRotate, 100);
}

function blockRotate(block, degStep) {
    let blockRotate = block.style.transform;
    let deg = +blockRotate.substr(7).replace('deg)','');
    let degNew = deg + degStep;
    block.style.cssText = `transform: rotate(${degNew}deg);`;
}

function gridColorsFill() {
    let pixels = document.querySelectorAll('.container_colors .grid__pixel');
    pixels.forEach(pixel=>{
        let colorRandom = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        pixel.style['background-color'] = colorRandom;
        pixelColorEvent(pixel);
    });
}

function pixelColorEvent(pixel) {
    pixel.addEventListener('click', evt=>{
        let colorPickerActive = document.querySelector('.color_active .color-picker');
        
        let colorPixel = evt.target.style.backgroundColor.slice(4,-1);
        let pixelRGB = colorPixel.split(',');
        let pixelR = +pixelRGB[0];
        let pixelG = +pixelRGB[1].trim();
        let pixelB = +pixelRGB[2].trim();
        
        let pixelHexR = pixelR.toString(16);
        let pixelHexG = pixelG.toString(16);
        let pixelHexB = pixelB.toString(16);

        if (pixelHexR.length == 1) {
            pixelHexR = '0' + pixelHexR; 
        }

        if (pixelHexG.length == 1) {
            pixelHexG = '0' + pixelHexG; 
        }

        if (pixelHexB.length == 1) {
            pixelHexB = '0' + pixelHexB; 
        }

        let pixelHex = '#' + pixelHexR + pixelHexG + pixelHexB;
        
        colorPickerActive.value = pixelHex;
        
        
        colorCurrent = pixelHex;
    });
}

gridColorsFill();

iconsRotate();