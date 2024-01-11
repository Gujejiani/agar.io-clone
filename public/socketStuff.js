
const socket = io.connect('http://localhost:9000');
console.log('heelo worlds', socket)
socket.on('init', initData=>{
    console.log(initData)
    orbs = initData.orbs
})