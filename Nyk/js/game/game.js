class Game extends IGame {
    constructor() {
        super();
        this.setupGame();
        this.running = true;
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

        return { startPos: alienStartXPoint, endPos: alienEndXPoint }
    }

    setupShields(alienStartEndPoints, playableArea) {
        let shieldForSpacing = new Shield(0, 0);
        let shieldWidth = shieldForSpacing.getWidth();
        let shieldHeight = shieldForSpacing.getHeight();

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
        this.gameObjects.push(new UI(0, 0, this.gameObjects, this.running))
    }
}
