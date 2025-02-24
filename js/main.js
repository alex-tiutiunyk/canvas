const canv = document.getElementById('canvas');
const btnClear = document.getElementById('clear');
const btnPlay = document.getElementById('play');
const colorPicker = document.getElementById('color');
const lineWidthInput = document.getElementById('line-width');

let isMouseDown = false;
let ctx = canv.getContext('2d');
let lineWidth = 10;
let lineColor = 'black';
let coords = [];
console.log(JSON.parse(localStorage.getItem('coords')));
let timer = null;

// set canvas size
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// clear
const clearCanvasLayer = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.beginPath();
};

const resetLayer = () => {
  clearCanvasLayer();

  clearInterval(timer);
  localStorage.setItem('coords', JSON.stringify([]));

  console.log('Cleared');
};
btnClear.addEventListener('click', resetLayer);

// play
const playCanvas = () => {
  coords = JSON.parse(localStorage.getItem('coords'));

  clearCanvasLayer();

  timer = setInterval(() => {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      console.log('Empty');
      return;
    }
    let crd = coords.shift();
    let e = { clientX: crd['0'], clientY: crd['1'] };

    drawLine(e);
  }, 10);
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
  lineColor = `${value}`;
};
colorPicker.addEventListener('change', setFillColor);

// set mouseDown
canv.addEventListener('mousedown', function () {
  isMouseDown = true;
  coords = JSON.parse(localStorage.getItem('coords'));
});

canv.addEventListener('mouseup', function () {
  isMouseDown = false;
  ctx.beginPath();
  coords.push('mouseup');
  localStorage.setItem('coords', JSON.stringify(coords));
});

function drawLine(e) {
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

// canvas settings
canv.addEventListener('mousemove', function (e) {
  if (isMouseDown) {
    coords.push([e.clientX, e.clientY]);

    drawLine(e);
  }
});
