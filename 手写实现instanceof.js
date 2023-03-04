
/**
 * 手写实现instanceof
 * instanceof 运算符用于判断 '构造函数的 prototype' 属性是否出现在 '对象的原型链' 中的任何位置。
 * object instanceof 构造函数
 */
var _instanceof = function (obj,pt) {
    if(typeof obj !== 'object' || obj===null) throw new Error('the first parameter is not a object')
    if(typeof pt !== 'function') throw new Error('the second parameter is not a function')
    let pointer = Object.getPrototypeOf(obj) || null;
    while(true){
        if(!pointer) return false;
        if(pt.prototype === pointer) return true;
        pointer = Object.getPrototypeOf(pointer)
    }
}
function a(){}
let b = new a;
console.log(_instanceof(b,Object))
console.log(a instanceof Object)