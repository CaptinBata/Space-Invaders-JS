class Button extends GameObject {
    constructor(x, y, id) {
        super(x, y);
        this.startButton = document.getElementById(id);
    }
}