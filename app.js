const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d"); //context 2d로 지정
//캔버스 크기 지정
canvas.width = 700;
canvas.height = 700;
//default 선색과 두께 지정
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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

function onMouseDown(event) {
    painting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting); //마우스 누름
    canvas.addEventListener("mouseup", stopPainting); //마우스 뗌
    canvas.addEventListener("mouseleave", stopPainting);
}