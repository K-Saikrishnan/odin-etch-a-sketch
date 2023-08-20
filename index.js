const DEFAULT_SIZE = 50,
  ColorSchemes = Object.freeze({ BLACK: 'BLACK', RAINBOW: 'RAINBOW' }),
  DEFAULT_COLOR_SCHEME = ColorSchemes.BLACK;

let gridSize = DEFAULT_SIZE,
  colorScheme = DEFAULT_COLOR_SCHEME;

const blackBtn = document.getElementById('black-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const slider = document.getElementById('size-slider');
const gridSizeValue = document.getElementById('size-value');
const eraseBtn = document.getElementById('erase-btn');
const grid = document.getElementById('grid');

window.onload = () => {
  slider.value = gridSize;
  setSizeValue(gridSize);
  setBlackBtnActiveClass();
  drawGrid(gridSize);
};

blackBtn.addEventListener('click', () => {
  if (colorScheme === ColorSchemes.BLACK) return;
  colorScheme = ColorSchemes.BLACK;
  setBlackBtnActiveClass();
  drawGrid(gridSize);
});

rainbowBtn.addEventListener('click', () => {
  if (colorScheme === ColorSchemes.RAINBOW) return;
  colorScheme = ColorSchemes.RAINBOW;
  setRainbowBtnActiveClass();
  drawGrid(gridSize);
});

slider.addEventListener('change', (e) => {
  gridSize = e.target.value;
  setSizeValue(gridSize);
  drawGrid(gridSize);
});

eraseBtn.addEventListener('click', () => drawGrid(gridSize));

function setSizeValue(size) {
  gridSizeValue.textContent = `${size} x ${size}`;
}

function setBlackBtnActiveClass() {
  rainbowBtn.classList.remove('active');
  blackBtn.classList.add('active');
}

function setRainbowBtnActiveClass() {
  blackBtn.classList.remove('active');
  rainbowBtn.classList.add('active');
}

function drawGrid(size) {
  grid.innerHTML = '';

  const GRID_TEMPLATE = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = grid.style.gridTemplateRows = GRID_TEMPLATE;

  for (let i = 0; i < size * size; i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('grid-cell');
    gridCell.addEventListener('mousedown', (e) => {
      /* 
        When the mouse button is held down and moved over the grid, the drag event is triggered. e.preventDefault() is a
        simpler solution to prevent this. It is possible to solve this using state variables but they will require a lot
        of state managing and debouncing functions unnecessarily introducing complexity.

        Reference links:
        https://stackoverflow.com/questions/71803395/event-listener-that-fires-only-when-mousedown-mouseover-are-true
        https://stackoverflow.com/questions/66058415/chrome-can-not-drag-icon-is-interfering-with-mouseover-events
      */
      e.preventDefault();
      changeGridCellColor(e);
    });
    gridCell.addEventListener('mouseover', (e) => changeGridCellColor(e));
    grid.appendChild(gridCell);
  }
}

function changeGridCellColor(e) {
  const mouseButtons = e.buttons;
  if (mouseButtons === 0) return;
  e.target.style.backgroundColor = colorScheme === ColorSchemes.BLACK ? 'black' : getRandomHexColor();
}

function getRandomHexColor() {
  const HEX_DIGITS = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor(Math.random() * 16)];
  }
  return color;
}
