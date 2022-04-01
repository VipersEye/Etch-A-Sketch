let switchGridSize = document.querySelector('.grid-size__input');
let btnClear = document.querySelector('.btn_clear');

btnClear.addEventListener('click', gridClear);
switchGridSize.addEventListener('input', (evt)=>{
    gridCreate('container_draw', evt.target.value);
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

    let pixels = document.querySelectorAll('.grid__pixel');

    if (gridType == 'container_draw') {
        pixelEvent(pixels);
    }

    else if (gridType == 'container_colors') {

    }
    
}

function pixelEvent(pixels) {
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseenter', (evt)=>{
            evt.target.style['background-color'] = '#000';
        });
    });
}

function gridClear() {
    let pixels = document.querySelectorAll('.grid__pixel');
    pixels.forEach(pixel => {
        pixel.style['background-color'] = '#fff';
    });
}