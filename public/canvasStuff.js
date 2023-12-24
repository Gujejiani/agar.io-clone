const init = () => {
console.log('am ready to draw')
draw()
}

let randomX = Math.floor(500 * Math.random() + 10); // horizontal axis
let randomY = Math.floor(500 * Math.random() + 10); // vertical axis

// in UiStaff we have context.beginPath();
context.beginPath();
context.fillStyle = "rgb(255, 0, 0)";
context.arc(randomX, randomY, 10 , 0, 2 * Math.PI);
// arg1 and arg2 are center x and center of the arc
// arg3 = radius of the circle
// arg4 = where to start drawing in radians
// arg 5 = where to stop drawing in radians - pi = 90 degrees
context.fill()
context.lineWidth =3
context.strokeStyle = 'rgb(0, 255, 0)' // draw a green line
context.stroke()
console.log(randomX)
// ==============================


// ===========Draw =======


// ==============================
const draw = ()=>{
   

}