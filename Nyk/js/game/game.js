class Game extends IGame {
    constructor(engineRef) {
        super();
        this.engineRef = engineRef
        this.setupGame();
    }

    setupPlayer(playableArea) {
        let playerHeight = new Player(0, 0).getHeight();
        let playerMidPosition = playableArea.min.x + ((playableArea.max.x - playableArea.min.x) / 2);

        this.player = new Player(playerMidPosition, playableArea.max.y - (playerHeight * 0.5))
    }

    setupAliens(playableArea) {
        this.aliens = [];

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
                this.aliens.push(new Alien(alienStartXPoint + (x * alienRowSpacing), alienStartYPoint + (y * alienColumnSpacing), y)) // the , y here denotes the type of alien to be drawn
            }
        }

        return { startPos: alienStartXPoint, endPos: alienEndXPoint }
    }

    setupShields(alienStartEndPoints, playableArea) {
        this.shields = [];

        let shieldForSpacing = new Shield(0, 0);
        let shieldWidth = shieldForSpacing.getWidth();
        let shieldHeight = shieldForSpacing.getHeight();

        let shieldSpacing = Math.round((alienStartEndPoints.endPos - alienStartEndPoints.startPos) / 3)
        let shieldXStartPoint = alienStartEndPoints.startPos
        let shieldYStartPoint = playableArea.max.y * 0.8;

        for (let x = 0; x < 4; x++) {
            this.shields.push(new Shield(shieldXStartPoint + shieldSpacing * x, shieldYStartPoint))
        }
    }

    setupGame() {
        this.setupPlayer(this.engineRef.playableArea);
        let alienStartEndPoints = this.setupAliens(this.engineRef.playableArea);
        this.setupShields(alienStartEndPoints, this.engineRef.playableArea);
    }

    checkDelete() {
        this.shields.forEach(shield => {
            shield.checkDelete();
            if (shield.toDelete)
                Utilities.removeElement(this.shields, shield);
        });

        this.aliens.forEach(alien => {
            if (alien.toDelete)
                Utilities.removeElement(this.aliens, alien);
        })

        this.player.checkDelete();

        if (this.player.toDelete)
            delete this.player;
    }

    update() {
        this.player.update(this.engineRef.keys);

        this.shields.forEach(shield => {
            this.player.getBullets().forEach(bullet => {
                shield.update(bullet);
            })
        });

        this.aliens.forEach(alien => {
            alien.update(this.player.getBullets());
        })

        this.checkDelete();
    }

    draw() {
        this.player.draw(this.engineRef.context);

        this.shields.forEach(shield => {
            shield.draw(this.engineRef.context)
        })

        this.aliens.forEach(alien => {
            alien.draw(this.engineRef.context)
        })
    }
}
