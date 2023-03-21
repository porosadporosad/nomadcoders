const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200-95,200-60,10,50);
ctx.fillRect(280-95,200-60,10,50);
ctx.fillRect(220-95,200-60,50,100);

ctx.arc(150,100,30,0,2 * Math.PI);
ctx.fill();
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(140,100,5,0,2 * Math.PI);
ctx.arc(160,100,5,0,2 * Math.PI);
ctx.fill();



