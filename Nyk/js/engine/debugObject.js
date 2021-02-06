class DebugObject extends GameObject {
    lastTime = null;
    fps = 0;
    constructor(x, y, playableArea) {
        super(x, y);

        let xMidPosition = playableArea.min.x + ((playableArea.max.x - playableArea.min.x) / 2);
        let yMidPosition = playableArea.min.y + ((playableArea.max.y - playableArea.min.y) / 2);

        this.setDrawObject({
            "left bar": {
                "drawPoints": [
                    new Vector(playableArea.min.x - 1, playableArea.min.y),
                    new Vector(playableArea.min.x + 1, playableArea.min.y),
                    new Vector(playableArea.min.x + 1, playableArea.max.y),
                    new Vector(playableArea.min.x - 1, playableArea.max.y),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
            "top bar": {
                "drawPoints": [
                    new Vector(playableArea.min.x, playableArea.min.y - 1),
                    new Vector(playableArea.max.x, playableArea.min.y - 1),
                    new Vector(playableArea.max.x, playableArea.min.y + 1),
                    new Vector(playableArea.min.x, playableArea.min.y + 1),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
            "right bar": {
                "drawPoints": [
                    new Vector(playableArea.max.x + 1, playableArea.min.y),
                    new Vector(playableArea.max.x + 1, playableArea.max.y),
                    new Vector(playableArea.max.x - 1, playableArea.max.y),
                    new Vector(playableArea.max.x - 1, playableArea.min.y),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
            "bottom bar": {
                "drawPoints": [
                    new Vector(playableArea.max.x, playableArea.max.y - 1),
                    new Vector(playableArea.max.x, playableArea.max.y + 1),
                    new Vector(playableArea.min.x, playableArea.max.y + 1),
                    new Vector(playableArea.min.x, playableArea.max.y - 1),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
            "x mid point": {
                "drawPoints": [
                    new Vector(xMidPosition - 1, playableArea.min.y),
                    new Vector(xMidPosition + 1, playableArea.min.y),
                    new Vector(xMidPosition + 1, playableArea.max.y),
                    new Vector(xMidPosition - 1, playableArea.max.y),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
            "y mid point": {
                "drawPoints": [
                    new Vector(playableArea.min.x, yMidPosition - 1),
                    new Vector(playableArea.max.x, yMidPosition - 1),
                    new Vector(playableArea.max.x, yMidPosition + 1),
                    new Vector(playableArea.min.x, yMidPosition + 1),
                ],
                "fillColour": "rgba(209, 49, 17, 0.45)",
                "strokeColour": ""
            },
        })
    }

    getFPS() {
        return this.fps;
    }

    update(timestamp) {
        if (this.lastTime != null) {
            let timeTaken = timestamp - this.lastTime;
            this.fps = 1000 / timeTaken; // 1000 because 1000 milliseconds in a second
        }
        this.lastTime = timestamp
    }

    draw(windowWidth, windowHeight) {
        this.drawByLine();

        Engine.context.font = "14px Gill Sans MT";
        Engine.context.fillText(`FPS: ${this.fps.toFixed(2)}`, windowWidth * 0.96, windowHeight * 0.99);
    }

    drawObjectBounds(objectToDraw) {
        let minGlobal = objectToDraw.toGlobalCoords(objectToDraw.minMax.min);
        let maxGlobal = objectToDraw.toGlobalCoords(objectToDraw.minMax.max);

        Engine.context.beginPath();

        Engine.context.moveTo(minGlobal.x, minGlobal.y)
        Engine.context.lineTo(maxGlobal.x, minGlobal.y)
        Engine.context.lineTo(maxGlobal.x, maxGlobal.y)
        Engine.context.lineTo(minGlobal.x, maxGlobal.y)

        Engine.context.closePath();
        this.setDrawModes("", "rgba(209, 49, 17, 0.45)"); //light red for object hitbox

        Object.values(objectToDraw.drawObject).forEach(drawable => {
            let minObjGlobal = objectToDraw.toGlobalCoords(drawable.minMax.min);
            let maxObjGlobal = objectToDraw.toGlobalCoords(drawable.minMax.max);

            Engine.context.beginPath();

            Engine.context.moveTo(minObjGlobal.x, minObjGlobal.y)
            Engine.context.lineTo(maxObjGlobal.x, minObjGlobal.y)
            Engine.context.lineTo(maxObjGlobal.x, maxObjGlobal.y)
            Engine.context.lineTo(minObjGlobal.x, maxObjGlobal.y)

            Engine.context.closePath();
            this.setDrawModes("", "rgba(102, 225, 0, 0.45)"); //light green for individual hitboxes
        });
    }
}