let switchGridSize = document.querySelector('.grid-size__input');
let gridDraw = document.querySelector('.container__grid');
let container = document.querySelector('.container');
switchGridSize.addEventListener('input', gridChange);
gridChange();

let btnClear = document.querySelector('.btn_clear');
btnClear.addEventListener('click', gridClear)

function gridChange (){
    let gridDraw = document.querySelector('.container__grid');
    container.removeChild(gridDraw);
    let newGrid = document.createElement('div')
    newGrid.classList.add('container__grid');
    let n = switchGridSize.value;
    let pixelSize = 100/n + '%';
    let pixel = document.createElement('div');
    pixel.style.cssText = `width: ${pixelSize}; height: ${pixelSize};`;
    pixel.classList.add('grid__pixel');
    for(let i = 0; i < n*n; i++) {
        let pixelSize = 100/n + '%';
        let pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}; height: ${pixelSize};`;
        pixel.classList.add('grid__pixel');
        newGrid.appendChild(pixel);
    }

    container.appendChild(newGrid);

    let pixels = document.querySelectorAll('.grid__pixel');
    pixelEvent(pixels);
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