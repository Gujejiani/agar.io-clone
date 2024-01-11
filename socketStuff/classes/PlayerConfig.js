// this is where all the data no other player needs to know

class PlayerConfig {
    constructor(settings){
        this.xVector = 0;
        this.yVector = 0;
        this.speed = settings.defaultSpeed;
        this.zoom = settings.defaultZoom;
        this.worldWidth = settings.worldWidth;
        this.worldHeight = settings.worldHeight;
    }
}


module.exports = PlayerConfig;