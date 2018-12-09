/**  Define a strutura de dados Vector2d
* Dependências:
*  /utility/delegate
**/

const Vector2D = (function vectorDataScope() {

    const vectorPrototype = {};

    vectorPrototype.add = function vectorAddMethod(vectorObj) {
        return Vector2D(
            this.x + vectorObj.x,
            this.y + vectorObj.y,
        );
    };

    vectorPrototype.limit = function vectorLimitMethod(x = 0, y = x) {
        return Vector2D(
            (this.x > x) ? x : this.x,
            (this.y > y) ? y : this.y,
        );
    };

    return function Vector2D(x = 0, y = x) {
        let vectorObj = { x, y };
        return delegate(vectorObj, vectorPrototype);
    }
})();