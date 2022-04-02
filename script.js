let switchGridSize = document.querySelector('.grid-size__input');
let btnClear = document.querySelector('.btn_clear');
let btnEraser = document.querySelector('.eraser');
let colorMain = document.querySelector('.color_first');
let colorPickers = document.querySelectorAll('.color');
let colorCurrent = colorMain.value;

colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('change', currentColorChange);
    colorPicker.addEventListener('click', currentColorChange);
});

function currentColorChange(evt) {
    let colorWrappers = document.querySelectorAll('.color');
    colorWrappers.forEach(colorWrapper => {
        colorWrapper.classList.toggle('color_active');
    });
    colorCurrent = evt.target.value;
}

btnClear.addEventListener('click', gridClear);

switchGridSize.addEventListener('input', (evt)=>{
    gridCreate('container_draw', evt.target.value);
});

btnEraser.addEventListener('click', eraserSwitching);

equalGridWidth();

gridCreate('container_draw', switchGridSize.value);
gridCreate('container_colors', 10);

function equalGridWidth() {
    let grid = document.querySelector('.container_draw');
    let height = grid.offsetHeight + 'px';
    grid.style.width = height;
}

function eraserSwitching (evt) {
    evt.target.classList.toggle('eraser_off');
    evt.target.classList.toggle('eraser_on');
    if (evt.target.classList.contains('eraser_on')) {
        colorCurrent = '#fff';
    }
    else if (evt.target.classList.contains('eraser_off')) {
        colorCurrent = colorMain.value;
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
    pixel.target.style['background-color'] = colorCurrent;
}

function gridClear() {
    let pixels = document.querySelectorAll('.grid__pixel');
    pixels.forEach(pixel => {
        pixel.style['background-color'] = '#fff';
    });
}