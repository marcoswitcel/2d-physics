"use strict";

/**
 * @TODO Colisão
 * implementado colisão com paredes,
 * funcionando só para o mundo
 * @TODO Abstrair gravidade para um modelo de aplicador
 *  de forças
 */

// Globais
const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");
const CONFIG = {width : 900, height: 506};
const FRAMES_PER_SECOND = 1000/600;

CANVAS.width = CONFIG.width;
CANVAS.height = CONFIG.height;

function main() {
    CTX.fillStyle = "White";
    CTX.fillRect(0, 0, CONFIG.width, CONFIG.height);

    WORLD.update();
    WORLD.render();

    setTimeout(main, FRAMES_PER_SECOND);
}


/* Propósito de teste
* Popula o mundo com objetos
*/
for (let elements of [PLAYER, ELMA]) {
    WORLD.inside.push(elements);
}


// Run
main();