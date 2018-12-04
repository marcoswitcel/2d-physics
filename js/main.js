"use strict";

// Globais
const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");
const CONFIG = {width : 900, height: 400};
const FRAMES_PER_SECOND = 1000/600;

CANVAS.width = CONFIG.width;
CANVAS.height = CONFIG.height;

// Escolher a cor que vai ser usada na 'renderização'
// CTX.fillStyle = "Red";
// desenha um retângulo da cor do valor do 'fillStyle' do CTX (context)
// posição hor, ver; largura e altura
// CTX.fillRect(0, 0, 100, 100);

// Funçãozinha que vincula objetos a outro objetos
// assim permitindo o lookup de atributos
function delegate(who, to) {
    who.__proto__ = to;
}
function notUndefined(...arg) {
    for (var value of arg) if (typeof value == "undefined") throw {message : "Valor não definido"};
}

/**
 * Objeto que contém algumas funcões de renderização
 * 
 * 
 **/
const renderizibles = {
    
    render : function render(obj = this) {
        let {color, xPos, yPos, width, height} = obj;        

        CTX.fillStyle = color;
        CTX.fillRect(xPos, yPos, width, height);
    }
};

const PLAYER = {
    color : "Blue",
    width: 10,
    height: 10,
    xPos : CONFIG.width / 2,
    yPos : CONFIG.height / 2
};

const EVIL_CAT = {
    color : "Blue",
    width: 20,
    height: 20,
    xPos : CONFIG.width / 2,
    yPos : CONFIG.height / 2
};

const CAT_RENDER = {
    update : function () {
        this.xPos += .5;
        this.yPos += .5;
    },
    render: function () {
        this.update();
        CAT_RENDER.__proto__.render.call(this);
    }
};

delegate(CAT_RENDER, renderizibles);
delegate(EVIL_CAT, CAT_RENDER);

// Agora PLAYER pode fazer uso dos métodos de renderizibles
delegate(PLAYER, renderizibles);

function main() {
    CTX.fillStyle = "White";
    CTX.fillRect(0, 0, CONFIG.width, CONFIG.height);


    EVIL_CAT.render();
    PLAYER.render();

    // @TODO implementar um timer que leva o tempo de processamento dem consideração
    // caso a quantidade de processamento aumentar
    setTimeout(main, FRAMES_PER_SECOND);
}

// Run game
main();