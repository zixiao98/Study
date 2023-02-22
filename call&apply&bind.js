/**
 * 作用：改变this指向
 * 区别：call和apply返回的是执行的具有结果，bind返回的是一个待执行的函数。
 *      call的第一个参数后面传的是参数列表，apply后面是一个数组。
 * 
 * 
 */

Function.prototype._myCall = function (newObj = window, ...args) {
    //边界处理(newObj可能为非真值对象)
    if (typeof newObj !== 'object') throw new Error('the first parameter is not a object')
    // newObj = newObj || window;//改用参数默认值
    //将这个fn，作为newObj的一个新属性
    let sym = Symbol('sym');
    newObj[sym] = this;
    //执行一遍
    const ret = newObj[sym](...args);
    //删除这个新增的属性
    delete newObj[sym];
    return ret;
}
Function.prototype._myApply = function (newObj = window, args) {
    //边界处理(newObj可能为非真值对象)
    if (typeof newObj !== 'object') throw new Error('the first parameter is not a object')
    // newObj = newObj || window;
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
        delete newObj[sym];//只能调用一次，这个版本pass,不删除属性，可以重复调用，但是会给newObj增加了一个本来不存在的属性
        return ret;
    }
}
Function.prototype._myBind2 = function(newObj,...args){
    //边界处理
    if(typeof this !== 'function') throw new Error(`the ${this.name} is not a function`)
    if(typeof newObj !== 'object' && newObj !=null) throw new Error('the first parameter is not a object')
    // let self = this;
    // return function(...otherArgs){
    //     let res = self.apply(newObj,[...args,...otherArgs])
    //     return res;
    // }
    //改用箭头函数没有this的特性，箭头函数里面的this实际上是外层环境中的this，并且是在定义的时候的确定
    return (...otherArgs)=>{
        return this.apply(newObj,[...args,...otherArgs])
    }
}


class MyC {
    name = 'MyC';
    static fnc = mySay
}
function mySay(number){
    console.log(this.name,number)
}
const myFN = MyC.fnc._myBind2({name:'MyA'},123);
myFN()
myFN()//_myBind 报错 _myBind2正常执行