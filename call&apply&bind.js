/**
 * 作用：改变this指向
 * 区别：call和apply返回的是执行的具有结果，bind返回的是一个待执行的函数。
 *      call的第一个参数后面传的是参数列表，apply后面是一个数组。
 * 
 * 
 */

Function.prototype._myCall = function (newObj, ...args) {
    //边界处理(newObj可能为非真值对象)
    if (typeof newObj !== 'object') throw new Error('the first parameter is not a object')
    newObj = newObj || window;
    //将这个fn，作为newObj的一个新属性
    let sym = Symbol('sym');
    newObj[sym] = this;
    //执行一遍
    const ret = newObj[sym](...args);
    //删除这个新增的属性
    delete newObj[sym];
    return ret;
}
Function.prototype._myApply = function (newObj, args) {
    //边界处理(newObj可能为非真值对象)
    if (typeof newObj !== 'object') throw new Error('the first parameter is not a object')
    newObj = newObj || window;
    //将这个fn，作为newObj的一个新属性
    let sym = Symbol('sym');
    newObj[sym] = this;
    //执行一遍
    const ret = newObj[sym](...args);
    //删除这个新增的属性
    delete newObj[sym];
    return ret;
}
const myArr = [].slice._myCall([1, 2, 3])
console.log(myArr)

Function.prototype._myBind = function (newObj, ...args) {
    //边界处理(newObj可能为非真值对象)
    if (typeof newObj !== 'object') throw new Error('the first parameter is not a object')
    newObj = newObj || window;
    let sym = Symbol('sym')
    newObj[sym] = this;

    return function(...OtherArgs){
        const ret = newObj[sym](...args,...OtherArgs);
        delete newObj[sym];//只能调用一次，这个版本pass
        return ret;
    }
}

class MyC {
    name = 'MyC';
    static fnc = mySay
}
function mySay(){
    console.log(this.name)
}
const myFN = MyC.fnc._myBind({name:'MyA'});
myFN()
myFN()//Error