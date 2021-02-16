class Alien extends BulletGameObject {
    pointValue = 0;
    bulletChance = 0.00025;
    constructor(x, y, alienIndex) {
        super(x, y)

        this.movement = true; //true - right, false - left
        this.nextMovement = true;
        this.moveSpeed = 30;
        this.perAlienSpeed = 0;
        this.alienCount = 0;
        this.changed = false;

        this.setAlienShape(alienIndex);
    }

    setAlienShape(alienIndex) {
        switch (alienIndex) {
            case 0:
                this.setDrawObject(alienStructureOne)
                this.pointValue = 30;
                break;
            case 1:
                this.setDrawObject(alienStructureTwo)
                this.pointValue = 20;
                break;
            case 2:
                this.setDrawObject(alienStructureThree)
                this.pointValue = 10;
                break;
            default:
                this.setDrawObject(alienStructureOne)
                this.pointValue = 10;
                break;
        }
    }

    checkDelete(gameObjects) {
        this.checkDeleteBullets();
    }

    moveDown() {
        this.position.y += (Engine.getWindowHeight() * .05)
    }

    setMovementSpeed(count) {
        this.alienCount = count;
        this.perAlienSpeed = this.moveSpeed / count;
    }

    update(gameObjects) {
        let aliens = gameObjects.filter(gameObject => gameObject instanceof Alien && gameObject != this)

        let currentSpeed = this.moveSpeed + (this.perAlienSpeed * (this.alienCount - aliens.length)) //scale based on missing aliens
        let frameMoveSpeed = currentSpeed / Engine.fps;

        if (!Number.isNaN(frameMoveSpeed))
            if (this.movement)
                this.position.x += frameMoveSpeed;
            else
                this.position.x -= frameMoveSpeed;

        if (Utilities.getRandomFloat(0, 1) <= this.bulletChance && this.bullets.length < 3)
            this.spawnBullet(this.position.x, this.position.y, true)

        this.updateBullets(gameObjects);

        if (!this.changed) {
            if (this.position.x > Engine.playableArea.max.x ||
                this.position.x < Engine.playableArea.min.x) {
                this.nextMovement = !this.nextMovement;
                this.changed = true;
                this.moveDown();

                aliens.forEach(alien => {
                    alien.nextMovement = !alien.nextMovement;
                    alien.changed = true;
                    alien.moveDown();
                })
            }
        }

        this.movement = this.nextMovement;
    }

    draw() {
        this.changed = false;
        this.drawBullets();
        this.drawByLine();
    }
}