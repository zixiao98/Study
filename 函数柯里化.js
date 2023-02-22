/**
 *  函数柯里化：
 *      将多个参数一次性全传入的方式转化为多次传入参数到函数调用所返回的函数中，最后得出结果的过程，称之为“函数柯里化”.
 */




function add(x, y, z, j) {
    return x + y + z + j
}

function curry(fn, ...args) {
    //边界判断
    if(typeof fn !== 'function') throw new TypeError('the first is not a function');
    //返回一个函数，后面将多次返回该函数
    return function curried(...other) {
        //判断接收到的参数是否符合形参个数要求
        let alen = [...args,...other];
        if(alen.length < fn.length){
            //继续收集参数
            return (...others)=>{
                return curried(...alen,...others)
            }
        }else {
            //最后得到结果
            return fn(...alen)
        }
    }

}
console.log(curry(add,111)(12,31,4))