const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); //context 2d로 지정
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
//캔버스 크기 지정
canvas.width = 700;
canvas.height = 700;
//default 선색과 두께 지정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
//선 그리기
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); //path, 좌표를 읽어 시작점 찾기
        ctx.moveTo(x, y); //시작점 지정
      } else {
        ctx.lineTo(x, y); //마우스 누느면 시작점부터 여기까지 선긋기
        ctx.stroke(); //선색 채우기
      }
}
//색 변경
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
//선 두께 변경
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
//색 채우기
function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//이미지 저장
function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "downloadImage";
    link.click();
}
//전체 지우기
function clearCanvasClick() {
    const nowColor = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = nowColor;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting); //마우스 누름
    canvas.addEventListener("mouseup", stopPainting); //마우스 뗌
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //마우스 우클
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn) {
    clearBtn.addEventListener("click", clearCanvasClick);
}

// https://chanhi.github.io/paintingJS/