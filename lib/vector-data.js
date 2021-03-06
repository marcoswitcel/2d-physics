/**  Define a strutura de dados Vector2d
* Dependências:
*  /utility/delegate
* Funções sempre retornam outro objeto
**/

const Vector2D = (function vectorDataScope() {

    const vectorPrototype = {};
    //@TODO Verificar método de adição
    vectorPrototype.add = function vectorAddMethod(vectorObj) {
        return Vector2D(
            this.x + vectorObj.x,
            this.y + vectorObj.y,
        );
    };
    //@TODO método limit, verificar
    vectorPrototype.limit = function vectorLimitMethod(x = 0, y = x) {
        return Vector2D(
            (this.x > x) ? x : this.x,
            (this.y > y) ? y : this.y,
        );
    };
    //@TODO criar método de sub

    return function Vector2D(x = 0, y = x) {
        let vectorObj = { x, y };
        return delegate(vectorObj, vectorPrototype);
    }
})();