class DebugObject extends GameObject {
    lastTime = null;
    fps = 0;
    constructor(x, y) {
        super(x, y);
        this.setDrawObject({
            "left bar": {
                "drawPoints": [],
            }
        })
    }

    update(timestamp) {
        if (this.lastTime != null) {
            let timeTaken = timestamp - this.lastTime;
            this.fps = 1000 / timeTaken; // 1000 because 1000 milliseconds in a second
        }
        this.lastTime = timestamp
    }

    draw(context, windowWidth, windowHeight) {
        this.setDrawModes(context, "", "#ffffff")

        context.font = "14px Gill Sans MT";
        context.fillText(`FPS: ${this.fps.toFixed(2)}`, windowWidth * 0.96, windowHeight * 0.99);
    }

    drawObjectBounds(context, objectToDraw) {
        let minGlobal = objectToDraw.toGlobalCoords(objectToDraw.minMax.min);
        let maxGlobal = objectToDraw.toGlobalCoords(objectToDraw.minMax.max);

        context.beginPath();

        context.moveTo(minGlobal.x, minGlobal.y)
        context.lineTo(maxGlobal.x, minGlobal.y)
        context.lineTo(maxGlobal.x, maxGlobal.y)
        context.lineTo(minGlobal.x, maxGlobal.y)

        context.closePath();
        this.setDrawModes(context, "", "rgba(209, 49, 17, 0.45)"); //light red for object hitbox

        Object.values(objectToDraw.drawObject).forEach(drawable => {
            let minObjGlobal = objectToDraw.toGlobalCoords(drawable.minMax.min);
            let maxObjGlobal = objectToDraw.toGlobalCoords(drawable.minMax.max);

            context.beginPath();

            context.moveTo(minObjGlobal.x, minObjGlobal.y)
            context.lineTo(maxObjGlobal.x, minObjGlobal.y)
            context.lineTo(maxObjGlobal.x, maxObjGlobal.y)
            context.lineTo(minObjGlobal.x, maxObjGlobal.y)

            context.closePath();
            this.setDrawModes(context, "", "rgba(102, 225, 0, 0.45)"); //light green for individual hitboxes
        });
    }
}