class Alien extends GameObject {
    bullets = [];
    pointValue = 0;
    constructor(x, y, alienIndex) {
        super(x, y)
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

    checkBulletCollision(bullets) {
        bullets.forEach(bullet => {
            if (this.detectAABBCollision(bullet)) {
                this.toDelete = true;
                bullet.toDelete = true;
            }
        })
    }

    checkDelete(gameObjects) {
        let player = gameObjects.filter(gameObject => gameObject instanceof Player)
        this.checkBulletCollision(player[0].getBullets());
    }

    update(gameObjects) {
        let player = gameObjects.filter(gameObject => gameObject instanceof Player)
    }
}