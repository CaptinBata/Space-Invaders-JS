class Game extends IGame {
    constructor() {
        super();

        this.running = true;

        this.setupGame();

    }

    setupPlayer(playableArea) {
        let playerHeight = new Player(0, 0).getHeight();
        let playerMidPosition = playableArea.min.x + ((playableArea.max.x - playableArea.min.x) / 2);

        this.gameObjects.push(new Player(playerMidPosition, playableArea.max.y - (playerHeight * 0.5)))
    }

    setupAliens(playableArea) {
        let alienForSpacing = new Alien(0, 0, 0);
        let alienWidth = alienForSpacing.getWidth();
        let alienHeight = alienForSpacing.getHeight();

        let alienRowSpacing = alienWidth * 1.5;
        let alienColumnSpacing = alienHeight * 1.5;
        let aliensPerRow = Math.round(((playableArea.max.x - alienRowSpacing) - (playableArea.min.x + alienRowSpacing)) / alienRowSpacing);

        let alienStartXPoint = playableArea.min.x + (alienWidth * 0.5) + alienRowSpacing;
        let alienStartYPoint = playableArea.min.y + (alienHeight * 0.5);

        let alienEndXPoint = 0;

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < aliensPerRow; x++) {
                if (x == aliensPerRow - 1)
                    alienEndXPoint = alienStartXPoint + (x * alienRowSpacing)
                this.gameObjects.push(new Alien(alienStartXPoint + (x * alienRowSpacing), alienStartYPoint + (y * alienColumnSpacing), y)) // the , y here denotes the type of alien to be drawn
            }
        }

        this.gameObjects.filter(gameObject => gameObject instanceof Alien).forEach((alien, index, array) => alien.setMovementSpeed(array.length)) //Set the increase of speed for when an alien dies

        return { startPos: alienStartXPoint, endPos: alienEndXPoint }
    }

    update() {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(this.gameObjects)
            gameObject.checkDelete(this.gameObjects);
        })

        this.checkDelete(this.gameObjects);
    }

    setupShields(alienStartEndPoints, playableArea) {
        let shieldSpacing = Math.round((alienStartEndPoints.endPos - alienStartEndPoints.startPos) / 3)
        let shieldXStartPoint = alienStartEndPoints.startPos
        let shieldYStartPoint = playableArea.max.y * 0.8;

        for (let x = 0; x < 4; x++) {
            this.gameObjects.push(new Shield(shieldXStartPoint + shieldSpacing * x, shieldYStartPoint))
        }
    }

    setupGame() {
        this.setupPlayer(Engine.playableArea);
        let alienStartEndPoints = this.setupAliens(Engine.playableArea);
        this.setupShields(alienStartEndPoints, Engine.playableArea);

        this.gameObjects.push(new UI(0, Engine.getWindowHeight(), this.gameObjects, this.running))
    }
}
