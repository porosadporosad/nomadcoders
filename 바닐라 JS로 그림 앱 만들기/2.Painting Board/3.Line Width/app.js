const Linewidth =  document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = Linewidth.value;
let inpainting = false;

function onMove(event){
    if(inpainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown(){
    inpainting = true;
}
function onMouseUp(){
    inpainting = false;
    ctx.beginPath();
}
function onChangeLine(event){
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);

Linewidth.addEventListener("change", onChangeLine);


