/** 
 * Arquivo de utilitários João Marcos de Vargas Witcel
**/
function delegate(who, to) {
    who.__proto__ = to;
    return who;
}