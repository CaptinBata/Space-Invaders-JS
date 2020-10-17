class Alien extends GameObject {
    bullets = [];
    constructor(x, y, alienIndex) {
        super(x, y)
        this.setAlienShape(alienIndex);
    }

    setAlienShape(alienIndex) {
        switch (alienIndex) {
            case 1:
                this.setDrawObject(alienStructureOne)
                break;
            default:
                this.setDrawObject(alienStructureOne)
                break;
        }
    }
}