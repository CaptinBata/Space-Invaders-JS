class Alien extends GameObject {
    bullets = [];
    constructor(x, y, alienIndex) {
        super(x, y)
        this.setAlienShape(alienIndex);
    }

    setAlienShape(alienIndex) {
        switch (alienIndex) {
            case 0:
                this.setDrawObject(alienStructureOne)
                break;
            case 1:
                this.setDrawObject(alienStructureTwo)
                break;
            case 2:
                this.setDrawObject(alienStructureThree)
                break;
            default:
                this.setDrawObject(alienStructureOne)
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