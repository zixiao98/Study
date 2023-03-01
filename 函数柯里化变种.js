/**
 *  函数柯里化变种：
 *  请实现一个 add 函数，满足以下功能
 *   add(1);// 1
 *   add(1)(2); // 3
 *   add(1)(2)(3)；// 6
 *   add(1)(2, 3); // 6
 *   add(1, 2)(3); // 6
 *   add(1, 2, 3); // 6
 */

function add(...agrs) {
    //add相当于老板，fn相当于会计
    //fn会计需要把钱收集好，然后交给老板，也需要帮老板最后把钱统计出来
    //返回工具函数收集参数
    let fn = (...others) => add(...agrs, ...others)//参数合并
    fn.toString = _ => agrs.reduce((per, cur) => per + cur, 0)
    //每次执行add,都会返回fn,fn的toString内有args,是收集好的参数合集
    return fn
}


function toLog(fn) {
    return fn.toString()
}
console.log(toLog(add(1)))
console.log(toLog(add(1)(2)))
console.log(toLog(add(1)(2)(3)))
console.log(toLog(add(1, 2)(3)))
console.log(toLog(add(1)(2, 3)))
console.log(toLog(add(1, 2, 3)))