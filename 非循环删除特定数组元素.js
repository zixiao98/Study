/**
 * 不使用循环API 来删除数组中指定位置的元素（如：删除第三位） 写越多越好
 * （如 for filter之类的）
*/

let arr = [1,2,3,4,5,6,7];

//第一种
//=> delete arr[index]

//第二种
//=> arr.splice(2,1) 在索引为2的地方，开始删除1个元素

//第三种
//=> arr = [...arr.slice(0,2),...arr.slice(3)] 片除了索引为3的元素的其他元素下来，并重新赋值给数组 ps:slice方法是不改变数组本身的

//第四种 利用object,并给obj实现可迭代
 let obj = {...arr,[Symbol.iterator]:function(){
    let index = 0;
    let keys = Object.keys(this)
    //重点：返回一个对象，这个对象里面有一个箭头函数next，
    //     这个箭头函数next又返回一个对象，里面有两个值，分别是value和done，当一致为false的时候，表示next还会执行（还能迭代）
    //     所以当我们遍历完所以的keys之后，要把done改为true
    return {
        next:()=>{
            return {
                value:this[keys[index]],
                done:index++ >= keys.length ? true :false
            }
        }
    }
 }};
 delete obj[2]
arr = [...obj]
 
console.log(arr)