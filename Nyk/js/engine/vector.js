class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    translatePosition(otherVector) {
        this.position = new Vector(
            this.position.x + otherVector.x,
            this.position.y + otherVector.y
        );
    }

    static translate(vector_1, vector_2) {
        return new Vector(
            vector_1.x + vector_2.x,
            vector_1.y + vector_2.y
        );
    }
}