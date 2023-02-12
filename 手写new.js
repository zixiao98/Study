/**
 *  new的时候发生了什么？？？ 
 *
 *   1.创建了一个空对象
 *   2.将空对象的隐性原型属性指向构造函数的原型对象
 *   3.将步骤1&2这个对象作为构造函数的this，执行一次构造函数
 *   4.如果步骤三中，执行结果为对象/函数，则返回这个结果，否则，返回步骤1&2这个对象
 * 
 */

//三行代码版本
function MyNew(fn,...arg){
    const newObj = Object.create(fn.prototype);
    const res = fn.apply(newObj,arg)
    return res instanceof Object ? res : newObj;
}

//一般版本
function _new(fn){
    //创建一个空的对象
    const newObj = Object.create({});
    //设置原型链接
    newObj.__proto__ = fn.prototype;
    //获取剩余参数
    let args = [].slice.call(arguments,1)//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments 影响性能
    //将新对象作为构造函数的this执行一次函数
    let ret  = fn.apply(newObj,args)

    return ret instanceof Object ? rer : newObj;
}

//进阶版
function _myNew(fn,...args){
    //边界条件判断（重要）
    if(typeof fn !== 'function') throw new Error('the first parameter is not a function');
    //1.创建一个空的对象
    const newObj = Object.create({});
    console.log([].shift.call(arguments))
    //判断fn的原型对象是否为空
    if(fn.prototype){
        //2.将上述步骤创建的newObj的隐性原型属性指向构造函数的原型对象。
        Object.setPrototypeOf(newObj,fn.prototype)
    }else{
        Object.setPrototypeOf(newObj,Object.prototype)
    }
    //3.用newObj作为fn的上下文this，执行一遍fn
    const ret = fn.apply(newObj,args);
    //判断ret是否为对象/函数，是则直接返回，否则返回newObj
    return ret instanceof Object ? ret : newObj;
}

//测试的构造函数
function myName(name,age){
    this.name = name
    this.age = age
}
// console.log(new myName('张三',18))
// console.log(_new(myName,'李四',19));
console.log(_myNew(myName,'李四',21));