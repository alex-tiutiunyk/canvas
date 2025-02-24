const canv = document.getElementById('canvas');
const btnClear = document.getElementById('clear');
const btnSave = document.getElementById('save');
const btnPlay = document.getElementById('play');
const colorPicker = document.getElementById('color');
const lineWidthInput = document.getElementById('line-width');

let isMouseDown = false;
let ctx = canv.getContext('2d');
let lineWidth = 10;
let lineColor = 'black';
const cords = [];

// set canvas size
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// clear
const clearCanvasLayer = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.beginPath();
  console.log('Cleared');
};
btnClear.addEventListener('click', clearCanvasLayer);

// save
const saveCanvasLayer = () => {
  localStorage.setItem('cords', JSON.stringify(cords));
  console.log('Saved');
};
btnSave.addEventListener('click', saveCanvasLayer);

// play
const playCanvas = () => {
  console.log('Play');
};
btnPlay.addEventListener('click', playCanvas);

// set line width
const setLineWidth = (e) => {
  const value = e.target.value;
  lineWidth = value;
};
lineWidthInput.addEventListener('change', setLineWidth);

// set line color
const setFillColor = (e) => {
  const value = e.target.value;
  console.log(value);
  lineColor = `${value}`;
};
colorPicker.addEventListener('change', setFillColor);

// set mouseDown
canv.addEventListener('mousedown', function () {
  isMouseDown = true;
});

canv.addEventListener('mouseup', function () {
  isMouseDown = false;
  ctx.beginPath();
});

// canvas settings
canv.addEventListener('mousemove', function (e) {
  if (isMouseDown) {
    cords.push([e.clientX, e.clientY]);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = lineColor;
    ctx.arc(e.clientX, e.clientY, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});
