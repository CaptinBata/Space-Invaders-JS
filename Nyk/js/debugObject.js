class DebugObject extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.setDrawObject({
            "left bar": {
                "drawPoints": [],
            }
        })
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
            this.setDrawModes(context, "", "rgba(102, 225, 0, 0.85)"); //light green for individual hitboxes
        });
    }
}