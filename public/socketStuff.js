const init = async () => {
    // init is called inside start game click listener
   const initData =  await socket.emitWithAck('init', {
        playerName: player.name
    
    })
    // our await has resolved so start talking 

    setInterval(()=>{
    socket.emit('tok', {
            xVector: player.xVector ? player.xVector : .1,
            yVector: player.yVector ? player.yVector : .1
    })
    },33)
   
    orbs = initData.orbs
    player.indexInPlayers = initData.indexInPlayers
    draw() // draw function is in canvasStuf
    }
const socket = io.connect('http://localhost:9000');

// socket.on('initReturn', initData=>{
//     console.log(initData)
//     orbs = initData.orbs
// })


// the server sends out the location/data of all players
socket.on('tick', (playersArray)=>{
    players = playersArray
    if(players[player.indexInPlayers].playerData){
        player.locX = players[player.indexInPlayers].playerData.locX;
        player.locY = players[player.indexInPlayers].playerData.locY;
    }
   
})

socket.on('orbSwitch', orbData=>{
    // server just told us that an orb just absorbed, replace it

    orbs.splice(orbData.captureDOrbI, 1, orbData.newOrb)
})
socket.on('playerAbsorbed', absorbData=>{
    document.querySelector('#game-message').innerHTML = `${absorbData.absorbed} absorbed by ${absorbData.absorbedBy}`
    document.querySelector('#game-message').style.opacity=1
    window.setTimeout(()=>{
        document.querySelector('#game-message').style.opacity=0
    }, 3000)

})


socket.on('updateLeaderBoard', leaderBoardArray=>{
    console.log(leaderBoardArray)
    leaderBoardArray.sort((a,b)=>{
        return b.score - a.score
    })

    document.querySelector('.leader-board').innerHTML = ''
   
    leaderBoardArray.forEach((leader)=>{
        if(!leader.name){
            return
        }
    
        document.querySelector('.leader-board').innerHTML += `
        <li class="leaderboard-player">${leader.name} - ${leader.score}</li>
        `
    })

})