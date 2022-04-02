let switchGridSize = document.querySelector('.grid-size__input');
let btnRandomColor = document.querySelector('.btn_random-color');
let btnDisplayGrid = document.querySelector('.btn_grid');
let btnClear = document.querySelector('.btn_clear');
let btnEraser = document.querySelector('.btn_eraser');
let colorMain = document.querySelector('.color_first');
let colorPickers = document.querySelectorAll('.color');
let colorCurrent = colorMain.value;

switchGridSize.addEventListener('input', (evt)=>{
    gridCreate('container_draw', evt.target.value);
});

btnRandomColor.addEventListener('click', btnClassToggle);

btnDisplayGrid.addEventListener('click', gridDisplayChange);

btnEraser.addEventListener('click', eraserSwitching);

btnClear.addEventListener('click', gridClear);

colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('change', currentColorChange);
    colorPicker.addEventListener('click', currentColorChange);
});

equalGridWidth();

gridCreate('container_draw', switchGridSize.value);
gridCreate('container_colors', 10);

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
    btnClassToggle(evt);
    if (evt.target.classList.contains('btn_on')) {
        pixels.forEach(pixel => {
            pixel.style.border = '1px solid #000';
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
    colorWrappers.forEach(colorWrapper => {
        colorWrapper.classList.toggle('color_active');
    });
    colorCurrent = evt.target.value;
}

function eraserSwitching (evt) {
    btnClassToggle(evt);
    if (evt.target.classList.contains('btn_on')) {
        colorCurrent = '#fff';
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
        let colorRandom = `rgb(${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)})`;
        pixel.target.style['background-color'] = colorRandom;
    }
    else {
        pixel.target.style['background-color'] = colorCurrent;
    }
}

function gridClear() {
    let pixels = document.querySelectorAll('.grid__pixel');
    pixels.forEach(pixel => {
        pixel.style['background-color'] = '#fff';
    });
}