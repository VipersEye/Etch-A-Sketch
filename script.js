let switchGridSize = document.querySelector('.grid-size__input');
let btnClear = document.querySelector('.btn_clear');
let btnEraser = document.querySelector('.eraser');
let color = '#000';
let colorMain = document.querySelector('.current-color');

btnClear.addEventListener('click', gridClear);
switchGridSize.addEventListener('input', (evt)=>{
    gridCreate('container_draw', evt.target.value);
});

btnEraser.addEventListener('click', (evt)=>{
    evt.target.classList.toggle('eraser_off');
    evt.target.classList.toggle('eraser_on');
    if (evt.target.classList.contains('eraser_on')) {
        color = '#fff';
    }
    else if (evt.target.classList.contains('eraser_off')) {
        color = colorMain.getAttribute('value');
    }
});



gridCreate('container_draw', switchGridSize.value);
gridCreate('container_colors', 10);

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

let pixelFill = (pixel) => {
    pixel.target.style['background-color'] = color;
}

function gridClear() {
    let pixels = document.querySelectorAll('.grid__pixel');
    pixels.forEach(pixel => {
        pixel.style['background-color'] = '#fff';
    });
}