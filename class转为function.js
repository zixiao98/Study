class Exmple{
    constructor(name,age){
        this.name = name;
        this.age = age
    }
    getInfo(){
        return `我的名字是：${this.name},年龄是：${this.age}`;
    }
}

//将 Exmple类 转为 构造函数function的形式 （es6 => es5）

// console.log(exp.getInfo.call(a))
/**
 * class类的特点：
 *      1.类默认开启了严格模式 =====> "use strict"
 *      2.类中的方法不可被实例枚举出来 =====> 使用Object.defineProperty(objecy,prop,descriptor)
 *      3.类的构造函数不能被普通调用，只能被new调用  =====> this instanceof 类名 true 说明是new调用生成的实例
 *      4.类中的方法不能被new调用，只能被普通调用 ======> 可以使用上面的 this instanceof 类名 来判断 false 说明实例在调用
*/

//1.开启严格模式
"use strict"

function Exmples(name,age){
    //3.类的构造函数只能被new调用
    if(!(this instanceof Exmples)){
        throw new TypeError("Class constructor Exmple cannot be invoked without 'new'")
    }
    this.name = name;
    this.age = age;
}
//2.类中的方法不能被实例枚举出来
// Exmples.prototype.getInfo = function(){ =======>这些写会被枚举出来
//     return `我的名字是：${this.name},年龄是：${this.age}`;
// }
//=====>改用Object.defineProperty(object,keyName,descriptor) 默认不可
Object.defineProperty(Exmples.prototype,'getInfo',{
    value:function(){
        console.log( this instanceof Exmples)
        //4.类中的方法不能被new调用
        if(new.target){ //用和2的一样的判断的话，使用call改变this指向会报错or将实例方法赋值给一个变量执行也会报错，可以用es6的new.target
            throw new TypeError('this function is not be a consctructor')
        }
        // if(!(this instanceof Exmples)){
        //     throw new TypeError('this function is not be a consctructor')
        // }
        return `我的名字是：${this.name},年龄是：${this.age}`;
    }
})
let a = {name:'詹三'}
let exps = new Exmples('lxj',25);
let expsa = exps.getInfo;
console.log( exps.getInfo())//报错
console.log( expsa())//在使用!(this instanceof Exmples)判断时会报错，因为这个时候方法内部的this已经是绑定全局的this了，又因为用了 "use strict" this此时为undefined
console.log(exps.getInfo.call(a))//正常执行