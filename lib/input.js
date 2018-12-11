/**  Arquivo de utilitários João Marcos de Vargas Witcel
* Dependências:
*  Vector2D
**/
const INTENTION = {
    x : 0,
    y : 0,
    taxa : 0.005,
};

INTENTION.accelVector = function accelVector() {
    return Vector2D(this.x * this.taxa, this.y * this.taxa);
};

INTENTION.isZero = function isZero() {
    return this.x === 0 && this.y === 0;
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
});