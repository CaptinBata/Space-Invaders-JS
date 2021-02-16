class BulletGameObject extends GameObject {
    bullets = [];
    constructor(x, y) {
        super(x, y)
    }

    getBullets() {
        return this.bullets;
    }

    spawnBullet(x, y, alien) {
        this.bullets.push(new Bullet(x, y, alien))
    }

    updateBullets(gameObjects) {
        this.bullets.forEach(bullet => {
            bullet.update(gameObjects);
        })
    }

    drawBullets() {
        this.bullets.forEach(bullet => { // Bullets draw first so we can hide it spawning behind the object. This make it look like it comes out of the gun
            bullet.draw()
        })
    }

    checkDeleteBullets() {
        this.bullets.forEach(bullet => {
            if (bullet.toDelete)
                Utilities.removeElement(this.bullets, bullet)
        });
    }
}