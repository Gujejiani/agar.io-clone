const init = () => {
console.log('am ready to draw')
draw()
}

player.locX=  Math.floor(500 * Math.random() + 10); // horizontal axis
player.locY = Math.floor(500 * Math.random() + 10); // vertical axis


// ==============================


// ===========Draw =======


// ==============================
const draw = ()=>{
    // clearRect clears out the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // reset the context translate back to default
    context.setTransform(1, 0, 0, 1, 0, 0);
    // clamp the screen/vp to the players location (x, y)
    const camX = -player.locX + canvas.width/2;
    const camY = -player.locY + canvas.height/2;
    // translate moves the canvas/context to where player is at
    context.translate(camX, camY)

        // in UiStaff we have context.beginPath();
        context.beginPath();
        context.fillStyle = "rgb(255, 0, 0)";
        context.arc(player.locX, player.locY, 10 , 0, 2 * Math.PI);
        context.arc(200,200, 10 , 0, 2 * Math.PI);
        // arg1 and arg2 are center x and center of the arc
        // arg3 = radius of the circle
        // arg4 = where to start drawing in radians
        // arg 5 = where to stop drawing in radians - pi = 90 degrees
        context.fill()
        context.lineWidth =3
        context.strokeStyle = 'rgb(0, 255, 0)' // draw a green line
        context.stroke()

 // requestAnimationFrame is like a controlled loop,
 // it runs recursively, every/frame if the framerate is 35fps
requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', (event)=>{
    // console.log(event)
  
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    speed = 10
    xV = xVector;
    yV = yVector;

    if((player.locX < 5 && xV < 0) || (player.locX > 500) && (xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }    
})