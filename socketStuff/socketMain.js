// where all our socket stuff will go

const io = require('../servers').io;

// oh... we need express, get app but only put what we need to inside of our socket
const app  = require('../servers').app;

// ====== CLASSES ======
const Player = require('./classes/Player');

const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/playerData');
// =========================

const Orb = require('./classes/Orb');
// make an orbs array that will host all 500/500 not player orbs 

// every time one is absorb the server will make new one

// on server start to make our initial 500
const orbs = []
const settings = {
    defaultNumberOfOrbs: 500, // number of orbs on the map
    defaultSpeed: 6, // how fast the orbs move
    defaultSize: 6, // how big the orbs are
    defaultZoom: 1.5, //  as the player gets bigger, zoom need to go out
    worldWidth: 500,
    worldHeight: 500,
    defaultGenericOrbSize: 5

}
initGame()
console.log('am running here')
io.on('connect', (socket)=>{
    // a player has connected
    console.log('connected')
      // make a playerConfig Object - the data specific to this player that only the player needs to know 
      const playerConfig = new PlayerConfig(settings)
      // make a playerData object - the data that everyone needs to know
        const playerData = new PlayerData('Rob', settings)
      // a master player object to house both
        const player = new Player(socket.id, playerConfig, playerData)
        socket.emit('init', {
           
            orbs
        })
})

function initGame(){
    // loop defaultNumberOrbs times, and push a new Orb() into our array
    for(let i = 0; i < settings.defaultNumberOfOrbs; i++){
        orbs.push(new Orb(settings))
    }

}