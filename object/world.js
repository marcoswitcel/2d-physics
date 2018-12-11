const WORLD = {
    /* largura escolhida para ser bem maior que a tela  */
    width: 2400,
    height: 506,
    backgroundColor: "#0a79f1",
    gravity : Vector2D(0, .005),
    xOffSet: 0,
    yOffSet: 0,
    inside: [],
};
WORLD.update = function() {
    for (let element of this.inside) {
        OPERATIONS.update[element.type].call(element);
    }
};
WORLD.render = function render() {
    CTX.fillStyle = this.backgroundColor;
    CTX.fillRect(this.xOffSet, this.yOffSet, this.width, this.height);

    for (let element of this.inside) {
        /* O próprio WORLD object é o contexto */
        OPERATIONS.render[element.type]
            .call(element, Object.assign({}, this));
    }
};

WORLD.changeOffSet = function changeOffSet(x, y) {
    this.xOffSet = x;
    this.yOffSet = y;
};