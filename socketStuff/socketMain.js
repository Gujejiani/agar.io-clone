// where all our socket stuff will go

const io = require('../servers').io;

// oh... we need express, get app but only put what we need to inside of our socket
const app  = require('../servers').app;
const checkForOrbCollisions = require('./checkCollisions').checkForOrbCollisions
const checkForPlayerCollisions = require('./checkCollisions').checkForPlayerCollisions

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
    defaultNumberOfOrbs: 5000, // number of orbs on the map
    defaultSpeed: 6, // how fast the orbs move
    defaultSize: 6, // how big the orbs are
    defaultZoom: 1.5, //  as the player gets bigger, zoom need to go out
    worldWidth: 5000,
    worldHeight: 5000,
    defaultGenericOrbSize: 5

}
const players = []
const playersForUsers = []
let tickTokInterval
initGame()
console.log('am running here')

//tick-tock - issue an event to every connected scoket that is playing the game 30 times per second 



io.on('connect', (socket)=>{
    let player = {}
    // a player has connected
    console.log('connected')
   
    socket.on('init', (playerObj, ackCallback)=>{
        if(players.length === 0){ // someone is about to be added to players. start tick-tocking
          tickTokInterval =  setInterval(()=> {
                io.to('game').emit('tick', playersForUsers)  // send the event to the game room
            }, 33) // 1000ms/30 = 33.3ms
        }
       


        socket.join('game') // add this coket to "game" room
        const playerName = playerObj.playerName
           // make a playerConfig Object - the data specific to this player that only the player needs to know 
         const playerConfig = new PlayerConfig(settings)
      // make a playerData object - the data that everyone needs to know
        const playerData = new PlayerData(playerName, settings)
      // a master player object to house both
         player = new Player(socket.id, playerConfig, playerData)
         console.log('pushing player ', player)
        players.push(player) // server use only
        playersForUsers.push({playerData}) // to be sent to the client
        // socket.emit('initReturn', {
           
        //     orbs
        // })
        ackCallback({orbs, indexInPlayers: playersForUsers.length -1}) // send the orbs back as ack object acknowledgement
    })
     // client send over the tok
    socket.on('tok', (data)=>{
        // a tock has come in before the player is set up.
        // this is because the client kept toking before the player was set up
        if(!player.playerConfig){
            return
        }
        speed = player.playerConfig.speed
       const xV = player.playerConfig.xVector = data.xVector;
       const yV = player.playerConfig.yVector = data.yVector;
    
        if((player.playerData.locX > 5 && xV < 0) || (player.playerData.locX < settings.worldWidth) && (xV > 0)){
            player.playerData.locX += speed * xV;
        }
        
        if((player.playerData.locY > 5 && yV > 0) || (player.playerData.locY < settings.worldHeight) && (yV < 0)){
            player.playerData.locY -= speed * yV;
        }

        // check for the tocking player to hit orbs

        const captureDOrbI = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)

        // function returns null if now collision and returns the index of the orb if there is a collision
        if(captureDOrbI !== null){
    
                    orbs.splice(captureDOrbI, 1, new Orb(settings))
                    // now update the clients with the new orb
                    const orbData = {
                        captureDOrbI,
                        newOrb: orbs[captureDOrbI]
                    }
                    // emit to all sockets playing the game the orbsWtich event that it can update orbs

                    io.to('game').emit('orbSwitch', orbData)

                    io.to('game').emit('updateLeaderBoard', getLeaderBoard())
        }
        // check for player collisions 
        const absorbData = checkForPlayerCollisions(player.playerData, player.playerConfig, players, playersForUsers, socket.id)

        if(absorbData ){
            io.to('game').emit('playerAbsorbed', absorbData)
        }


    })
    socket.on('disconnect', (reason)=>{
        // loop through players  and find the player with this players socketid 
        for(let i =0; i<player.length; i++){
            if(players[i].socketId === socket.id){
                players.splice(i,1)
                playersForUsers.splice(i,1)
            }
        }
        // check to see if player is empty, if so stop ticking
        if(players.length === 0){
            clearInterval(tickTokInterval)
        }
        
    })
})

function initGame(){
    // loop defaultNumberOrbs times, and push a new Orb() into our array
    for(let i = 0; i < settings.defaultNumberOfOrbs; i++){
        orbs.push(new Orb(settings))
    }

}

function getLeaderBoard(){
    // sort players in desc order
    // players.sort((a,b)=>{
    //     return b.playerData.score - a.playerData.score
    // })
    const leaderBoard = players.map((player)=>{
        if(player.playerData){
            return {
                name: player.playerData.name,
                score: player.playerData.score
            }
        }
        return {}
    })
    return leaderBoard
}