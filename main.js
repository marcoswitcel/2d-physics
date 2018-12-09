"use strict";

// Globais
const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");
const CONFIG = {width : 900, height: 506};
const FRAMES_PER_SECOND = 1000/600;

CANVAS.width = CONFIG.width;
CANVAS.height = CONFIG.height;



const DEFAULT_UPDATE_RENDER = {
    update : NOOP,
    render : function render(obj = this) {
        let {color, position, velocity, accel} = obj;        

        CTX.fillStyle = color;
        CTX.fillRect(position.x, position.y, 10, 10);
    }
};

const WORLD = {
    /* largura escolhida para ser bem maior que a tela  */
    width: 2400,
    height: 506,
    backgroundColor: "#0a79f1",
    xOffSet: 0,
    yOffSet: 0,
    inside: [],
};
WORLD.update = function() {
    for (let element of this.inside) {
        element.update();
    }
};
WORLD.render = function render() {
    CTX.fillStyle = this.backgroundColor;
    CTX.fillRect(this.xOffSet, this.yOffSet, this.width, this.height);

    for (let element of this.inside) {
        /* O próprio WORLD object é o contexto */
        element.render(this);
    }
};

WORLD.changeOffSet = function changeOffSet(x, y) {
    this.xOffSet = x;
    this.yOffSet = y;
};


/* PLAYER obj - begin */
const PLAYER = noProto({
    color: "Blue",
    position: Vector2D(WORLD.width/2, WORLD.height/2),
    velocity: Vector2D(0, 0),
    accel: Vector2D(0, 0),
});

PLAYER.update = function() {
    this.accel = INTENTION.accelVector();
    this.velocity = this.velocity.add(this.accel);
    this.velocity = this.velocity.limit(5);
    this.position = this.position.add(this.velocity);
};

PLAYER.render = function render(context) {
    let {color, position, velocity, accel} = this;


    let xOffSet = -(position.x - (CANVAS.width/2));
    let yOffSet = -(position.y - (CANVAS.height/2));
    WORLD.changeOffSet(xOffSet, yOffSet);

    CTX.fillStyle = color;
    CTX.fillRect(position.x + context.xOffSet, position.y + context.yOffSet, 10, 10);
}

delegate(PLAYER, DEFAULT_UPDATE_RENDER);

const ELMA = noProto({
    color: "Pink",
    position: Vector2D(WORLD.width/2 + 30, WORLD.height/2 + 20),
    velocity: Vector2D(0, 0),
    accel: Vector2D(0, 0),
})

ELMA.update = NOOP;

ELMA.render = function render(context) {
    let {color, position, velocity, accel} = this;


    CTX.fillStyle = color;
    CTX.fillRect(position.x + context.xOffSet, position.y + context.yOffSet, 10, 10);
}
/* PLAYER obj - end */

function main() {
    CTX.fillStyle = "White";
    CTX.fillRect(0, 0, CONFIG.width, CONFIG.height);

    WORLD.update();
    WORLD.render();

    // @TODO implementar um timer que leva o tempo de processamento dem consideração
    // caso a quantidade de processamento aumentar
    setTimeout(main, FRAMES_PER_SECOND);
}


// Propósito de teste
for (let elements of [PLAYER, ELMA]) {
    WORLD.inside.push(elements);
}


// Run
main();