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
        Object.values(objectToDraw.drawObject).forEach(drawable => {
            context.beginPath();

            context.moveTo(objectToDraw.toGlobalCoords(drawable.minMax.min).x, objectToDraw.toGlobalCoords(drawable.minMax.min).y)
            context.lineTo(objectToDraw.toGlobalCoords(drawable.minMax.max).x, objectToDraw.toGlobalCoords(drawable.minMax.min).y)
            context.lineTo(objectToDraw.toGlobalCoords(drawable.minMax.max).x, objectToDraw.toGlobalCoords(drawable.minMax.max).y)
            context.lineTo(objectToDraw.toGlobalCoords(drawable.minMax.min).x, objectToDraw.toGlobalCoords(drawable.minMax.max).y)

            context.closePath();
            this.setDrawModes(context, "", "rgba(102, 225, 0, 0.85)"); //light green for individual hitboxes
        });

        context.beginPath();

        context.moveTo(objectToDraw.toGlobalCoords(objectToDraw.minMax.min).x, objectToDraw.toGlobalCoords(objectToDraw.minMax.min).y)
        context.lineTo(objectToDraw.toGlobalCoords(objectToDraw.minMax.max).x, objectToDraw.toGlobalCoords(objectToDraw.minMax.min).y)
        context.lineTo(objectToDraw.toGlobalCoords(objectToDraw.minMax.max).x, objectToDraw.toGlobalCoords(objectToDraw.minMax.max).y)
        context.lineTo(objectToDraw.toGlobalCoords(objectToDraw.minMax.min).x, objectToDraw.toGlobalCoords(objectToDraw.minMax.max).y)

        context.closePath();
        this.setDrawModes(context, "", "rgba(209, 49, 17, 0.45)"); //light red for object hitbox
    }
}