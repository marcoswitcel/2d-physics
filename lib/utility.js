/**  Arquivo de utilitários João Marcos de Vargas Witcel
* Dependências:
*  Nenhuma
**/

const NOOP = Function.prototype;

function noProto(object) {
    // O atributo "__proto__" só pode ser setada para null
    // se tentar undefined ela não apaga a antiga referência
    object.__proto__ = null;
    return object;
};

function delegate(who, to) {
    who.__proto__ = to;
    return who;
}