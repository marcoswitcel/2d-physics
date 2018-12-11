const OPERATIONS = { /* Container das funções */ };
OPERATIONS.update = {
    player : function updatePlayer() {
        /* Dependência externa */
        this.accel = INTENTION.accelVector().add(WORLD.gravity);
        this.velocity = this.velocity.add(this.accel);
        this.velocity = this.velocity.limit(5);
        this.position = this.position.add(this.velocity);
        {
            let { x : xPos ,y : yPos } = this.position;
            let { x : xVel ,y : yVel } = this.velocity;
            if (xPos > WORLD.width || xPos < 0) {
                xVel *= -.8;
                this.velocity = Vector2D(xVel, yVel);
                this.position = Vector2D(
                    xPos < 0 ? 0 : WORLD.width, 
                    yPos
                );
            }
            if (yPos > WORLD.height || yPos < 0) {
                yVel *= -.8;
                this.velocity = Vector2D(xVel, yVel);
                this.position = Vector2D(
                    xPos, 
                    yPos < 0 ? 0 : WORLD.height
                );
            }
        }
    },
    normalObjects : function updateNormalObjects() {},
};

OPERATIONS.render = {
    player : function render(context) {
        let {color, position} = this;
    
        let xOffSet = -(position.x - (CANVAS.width/2));
        let yOffSet = -(position.y - (CANVAS.height/2));

        //WORLD.changeOffSet(xOffSet, yOffSet);
        WORLD.changeOffSet(xOffSet, 0);
    
        CTX.fillStyle = color;
        CTX.fillRect(position.x + context.xOffSet, position.y + context.yOffSet, 1, 1);
    },
    normalObjects : function render(context) {
        let { color, position } = this;        
    
        CTX.fillStyle = color;
        CTX.fillRect(position.x + context.xOffSet, position.y + context.yOffSet, 10, 10);
    }
};