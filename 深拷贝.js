/**
 * 
 * 浅拷贝：开辟一块新空间，存储拷贝目标对象的所有属性的副本，
 *        如果是基础属性，则是拷贝的值，
 *         如果是引用属性，拷贝的是内存地址，
 *        因此浅拷贝出来的新对象可能会影响拷贝目标对象
 * 
 * 深拷贝：开辟一块新空间，存储拷贝目标对象的所有属性的副本，
 *         无论是基础属性还是引用属性，拷贝的都是值，即完完全全的复制
 *         拷贝出来的新对象无法影响拷贝目标对象
 *
 * 
 */
/**
 * 
 * 常见的浅拷贝的方法有
 *  ->对象
 *  1. {...target } 展开运算符 
 *  2. Object.assign({},target)
 *  ->数组
 *  1. [...targetArr] 展开运算符 
 *  2.Array.prototype.slice.call(targetArr)
 *  2.Array.prototype.concat.call(targetArr)
 */


let myObj = {
    name: 'lzj',
    age: 24,
    has: [1, 2, 3, 4],
    nohas: {
        name: 'nohas',
        age: null
    },
    last: undefined,
    sym: Symbol(),
    // fnc: function () {
    //     console.log(this.name)
    // }
}

//粗暴的方法JSON.parse(JSON.stringify(target)) 只针对基础属性，普通对象以及数组的情况，但是会丢失null，Symbol,funcion等
let JsonClone = JSON.parse(JSON.stringify(myObj))
// console.log(JsonClone)

//初级手写版，只考虑属性为基础属性，普通对象以及数组的情况
function _clone(target) {
    //边界处理
    if (target == null || typeof target !== 'object') return target;
    //判断是对象还是数组
    let obj = Array.isArray(target) ? [] : {};
    //循环拷贝
    for (const index in target) {
        obj[index] = _clone(target[index])
    }
    return obj;
}

//考虑循环引用用版本，使用weakMap来存储已经拷贝过的对象，避免其重复拷贝
function _cloneA(target, map = new WeakMap()) { //weakMap弱引用，使得存储在里面的对象可以被垃圾回收机制处理
    //边界处理
    if (target == null || typeof target !== 'object') return target;

    //判断target是不是已经克隆过了，是就直接返回不再克隆了，否就记录下来，克隆
    if (map.has(target)) {
        return map.get(target)
    } else {
        var obj = {};
        if (Array.isArray(target)) {
            obj = [];
        }
        map.set(target, obj)
    }
    //属性克隆
    //由于使用for...in遍历数组的性能较差，所以我们需要写一个辅助函数来进行循环
    let keys = Array.isArray(target) ? undefined : Object.keys(target);
    myForIn(keys || target, (value, index) => {
        //如果是对象，value应该是key属性名，如果是数组，value就是值
        if (keys) {
            //是对象
            index = value;
        }
        obj[index] = _cloneA(target[index], map)
    })

    return obj
}

//辅助循环函数
//第一个参数为对象keys数组，或者数组本题
function myForIn(arr, cb) {
    //通过对象的keys长度或者数组的length来控制循环

    let index = 0; //初始位
    let length = arr.length;
    while (index < length) {
        //进行属性克隆，通过cb实现
        cb(arr[index], index)
        index++
    }
}
console.log(myObj, _cloneA(myObj))