/**
 * 数组拍平：也称为数组扁平化， 扁平化就是将多维数组变成一维数组,不存在数组的嵌套
 * 
*/


let arr = [1, 2, [2, 4, [2, 1, [2],
            [1, 4, 5, 6]
        ],
        [17, 28]
    ],
    [12, 32]
];

//自带方法 Array.prototype.flat(层数/infinity)
console.log(arr.flat(Infinity))

//手写版
function _flat(arr) {
    return arr.reduce((per, cur) => {
        return per.concat(Array.isArray(cur) ? _flat(cur) : cur)
    }, [])
}
console.log(_flat(arr))

//手写版 - 参加拍平层数
function _flat2(arr, deep) {
    if (deep <= 0) return arr
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(_flat2(arr[i], deep - 1)) //这里记得给res重新赋值，因为concat返回的是新数组，不会改变原数组
        } else {
            res.push(arr[i])
        }
    }
    return res
}
console.log(_flat2(arr, 3))
//concat可以展开一层的特性
function _flatSp(arr) {
    if (!Array.isArray(arr)) throw new TypeError('the parameter is not a array');
    let res = [];
    for (const item of arr) {
        res = res.concat(Array.isArray(item) ? _flatSp(item) : item)
    }
    return res;
}
console.log(_flatSp(arr))
//利用展开运算符可以开展一层的特性
function SpreadFlat(arr) {
    if(!Array.isArray(arr)) throw new TypeError('the parameter is not a array');
    let res = [];
    for (const item of arr) {
        res = Array.isArray(item) ? [...res,...SpreadFlat(item)] : [...res,item]
    }
    return res
}
console.log(SpreadFlat(arr))