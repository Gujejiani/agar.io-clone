
// set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
// canvas element needs to be in a variable 
let canvas = document.getElementById("the-canvas");
// context is what we draw on
const context = canvas.getContext("2d");
canvas.height = wHeight;
canvas.width = wWidth;
const player = {} // this will be all thins "this player"

// put the modals into the variables so we can interact with them
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

window.addEventListener('load', ()=>{
    // on page load, open the login modal
    loginModal.show();

})

document.querySelector('.name-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    
    player.name = document.querySelector('#name-input').value;
    document.querySelector('.player-name').innerHTML = player.name;
    loginModal.hide();
    spawnModal.show();
    console.log(player)
})

document.querySelector('.start-game').addEventListener('click', (e)=>{
    // hide the start modal
    init()
    spawnModal.hide();
    // show the hiddenOn start
    Array.from(document.querySelectorAll('.hiddenOnStart')).forEach((el)=>{
        el.removeAttribute('hidden')
    })
})