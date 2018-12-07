"use strict";

// Globais
const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");
const CONFIG = {width : 900, height: 506};
const FRAMES_PER_SECOND = 1000/600;

CANVAS.width = CONFIG.width;
CANVAS.height = CONFIG.height;



const renderizibles = {
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
const PLAYER = {
    color: "Blue",
    position: Vector2D(WORLD.width/2, WORLD.height/2),
    velocity: Vector2D(0, 0),
    accel: Vector2D(0, 0),
};

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

delegate(PLAYER, renderizibles);

const ELMA = {
    color: "Pink",
    position: Vector2D(WORLD.width/2 + 30, WORLD.height/2 + 20),
    velocity: Vector2D(0, 0),
    accel: Vector2D(0, 0),
}

ELMA.update = function() {
    this.velocity = this.velocity.add(this.accel);
    this.velocity = this.velocity.limit(5);
    this.position = this.position.add(this.velocity);
};

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

WORLD.inside.push(PLAYER);
WORLD.inside.push(ELMA);

const INTENTION = {
    x : 0,
    y : 0,
    taxa : 0.005,
};

INTENTION.accelVector = function accelVector() {
    return Vector2D(this.x * this.taxa, this.y * this.taxa);
};

window.addEventListener("keydown", function (event) {
    /* O evento keydown se repete, por isso coloquei o limitador */
    INTENTION.x += (event.key === "d") ? 1 : (event.key === "a") ? -1 : INTENTION.x;
    INTENTION.x = (INTENTION.x > 1) ? 1 : (INTENTION.x < -1) ? -1 : INTENTION.x;
    INTENTION.y += (event.key === "s") ? 1 : (event.key === "w") ? -1 : INTENTION.y;
    INTENTION.y = (INTENTION.y > 1) ? 1 : (INTENTION.y < -1) ? -1 : INTENTION.y;
});
window.addEventListener("keyup", function (event) {
    INTENTION.x -= (event.key === "d") ? 1 : (event.key === "a") ? -1 : INTENTION.x;
    INTENTION.y -= (event.key === "s") ? 1 : (event.key === "w") ? -1 : INTENTION.y;
    this.console.log(INTENTION.accelVector());
});


// Run
main();