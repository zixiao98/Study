/**
 * 
 * 两个数组中完全独立的数据
 * 就是找到仅在两个数组中出现过一次的数据
 */

let a = [1, 2, 4],
    b = [1, 3, 8, 4];


// function foo(a, b) {
//     return [...unIncludes(a,b), ...unIncludes(b,a)]
// }
//简写
let foo = (a, b) => [...unIncludes(a, b), ...unIncludes(b, a)]

// function unIncludes(arrA, arrB) {
//     return arrA.filter(e => {
//         return !arrB.includes(e)
//     })
// }
//简写 - 独立出现，那就是说，a有，b没有，逆向思维，找出双方在对面没有出现过的item
let unIncludes = (a, b) => a.filter(e => !b.includes(e))


//另一种写法 合并之后，找出index和lastIndex一致的item即是独立出现的item
let res = [...a, ...b].filter((e, _, arr) => arr.lastIndexOf(e) == arr.indexOf(e))

console.log(foo(a, b))
console.log(res)