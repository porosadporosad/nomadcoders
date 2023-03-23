const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const modeBtn = document.getElementById("fill-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const Linewidth =  document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = Linewidth.value;
ctx.lineCap = "round";
let ispainting = false;
let isFilling = false;

function onMove(event){
    if(ispainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown(){
    ispainting = true;
}
function onMouseUp(){
    ispainting = false;
    ctx.beginPath();
}
function onChangeLine(event){
    ctx.lineWidth = event.target.value;
}
function onColorChagne(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const datasetColor = event.target.dataset.color;
    ctx.strokeStyle = datasetColor;
    ctx.fillStyle = datasetColor;
    color.value = datasetColor;
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Darw";
    }
}
function onClickFill(){
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
}
function onEraseClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChagne(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,200,200);
        fileInput.value = null;
    }
}

function onDblclickText(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "55px serif";
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }
    
}
function onClcikSave(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDblclickText);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onClickFill);

Linewidth.addEventListener("change", onChangeLine);
color.addEventListener("change", onColorChagne);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);

destroyBtn.addEventListener("click", onDestroyClick);

eraseBtn.addEventListener("click", onEraseClick);

fileInput.addEventListener("change", onFileChagne);

saveBtn.addEventListener("click", onClcikSave);