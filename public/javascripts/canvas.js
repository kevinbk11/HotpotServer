var spacing = 40;
var c = document.getElementById("canvas_1");
c.width = window.innerWidth * 0.6;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
ctx.fillStyle = 'rgba(230, 184, 156, 0.75)';
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(220.21091 + spacing, 0);
ctx.arc(600 + spacing, window.innerHeight / 2, 600, 230.73 * Math.PI / 180, 129.27 * Math.PI / 180, true);
ctx.lineTo(220.21091 + spacing, 1980);
ctx.lineTo(0, 1080);
ctx.closePath();
ctx.fill();