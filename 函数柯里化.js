/**
 *  函数柯里化：
 *      将多个参数一次性全传入的方式转化为多次传入参数到函数调用所返回的函数中，最后得出结果的过程，称之为“函数柯里化”.
 */

function add(x, y, z, j) {
    console.log(this.name)
    return x + y + z + j
}

function curry(fn, ...args) {
    //边界判断
    if (typeof fn !== 'function') throw new TypeError('the first is not a function');
    //返回一个函数，后面将多次返回该函数
    // return function curried(...other) {
    //     //判断接收到的参数是否符合形参个数要求
    //     let alen = [...args,...other];
    //     if(alen.length < fn.length){
    //         //继续收集参数
    //         return (...others)=>{
    //             return curried(...alen,...others)
    //         }
    //     }else {
    //         //最后得到结果
    //         return fn(...alen)
    //     }
    // }
    //上述写法会造成this丢失
    //改为
    let curried = (...other) => {
        // 判断接收到的参数是否符合形参个数要求
        let alen = [...args,...other];
        if(alen.length < fn.length){
            //继续收集参数
            // return curried(...alen,...others)这样是不行的， 要保证返回的是一个函数，这个函数需要返回结果，而不是一个函数运行的结果
            return (...others)=>{//参数收集函数，辅助curried函数进行参数收集，并返回currid的结果
                return curried(...alen,...others)
            }
        }else {
            //最后得到结果
            return fn.apply(this,alen)//此时箭头函数内部的“this”会绑定curry环境中的this
        }
    }
    return curried
}
console.log(curry(add, 111)(12, 31)(42))
console.log(curry.call({name:'lzj'},add, 111)(12, 31, 42))