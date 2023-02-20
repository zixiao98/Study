/**
 * 数组出重的关键：什么是重？ 重即是重复相同的的值，但实际上,js有多种判断相等的方法，需背靠实际业务场景去实现去重
 * 
*/

//一般性的方法 ， 一行代码[...new Set(targetArr)]
let arr = [1,2,3,4,2,3,1,23,14,1,2,
    {name:'lzj',age:12},3,4,2,2,23,1,5,
    {name:'lzj',age:13},{name:'lxj'},{name:'lzj'},{name:'lxj'}]
// console.log([...new Set(arr)])

//需要针对实际需求的写法，手写一个函数
/**
 * 
 * 数组去重，
 * 要求：1.原始值要使用严格相等判断
 *      2.对象值递归比较所有属性，属性数量和属性名称必须严格一致，属性值要相同
 *         数组中的对象均为plain object
 * 
*/

function arrDR(target){
    //边界判断
    if(!Array.isArray(target)) throw new TypeError('the parameter is not a arr')
    let res = []//新数组
    let length = target.length;
    let flag = false;
    for (let i = 0; i < length; i++) {
        flag = false;
        for (let j = 0; j < res.length; j++) {
           if(equals(target[i],res[j])){//对象不能用这种方法，因此我们需要写一个辅助函数
                flag = true;
                break;
           }
        }
        if(!flag){
            res.push(target[i])
        }
    }
    return res;
}

function equals(v1,v2){//判断是否相等
    let tagA = v1 instanceof Object;
    let tagB = v2 instanceof Object;
    //两者都是原始值时候的比较
    if(!tagA && !tagB && v1 === v2) return true; 
    //两者都是对象时候的比较
    if(tagA && tagB) {
        //1.先比较属性的数量
        if(Object.keys(v1).length !== Object.keys(v2).length) return false;
        //2.比较所有属性名是否相等
        let keysA = Object.keys(v1);
        let keysB = Object.keys(v2);
        let nameEquals =  keysA.every((v)=>{
           return keysB.includes(v)//记住要return
        })
        if(!nameEquals) return false;
       //2.比较属性值
       let valueEquals = true
       for (const key of keysA) {
            if(!equals(v1[key],v2[key])){//递归调用，发现属性值有不同的，停止循环，返回false
                valueEquals = false
                break;
            }
       }
       return valueEquals
    }

    return false;
}
console.log(arrDR(arr))