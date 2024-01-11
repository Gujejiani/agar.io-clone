// where all our socket stuff will go

const io = require('../servers').io;

// oh... we need express, get app but only put what we need to inside of our socket
const app  = require('../servers').app;

const Orb = require('./classes/Orb');
// make an orbs array that will host all 500/500 not player orbs 

// every time one is absorb the server will make new one

// on server start to make our initial 500
const orbs = []
initGame()
console.log('am running here')
io.on('connect', (socket)=>{
    console.log('connected')
        socket.emit('init', {
            orbs
        })
})

function initGame(){
    // loop 500 times, and push a new Orb() into our array
    for(let i = 0; i < 500; i++){
        orbs.push(new Orb())
    }

}