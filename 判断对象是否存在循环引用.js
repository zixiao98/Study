/**
 * 判断对象是否存在循环引用
*/

const a = 1;
const b = {a};
const c = {b};
const o = {d:{a:3},c}
//jy写的
const isCycleObject = (obj,parent) => {
    const parentArr = parent || [obj];
    for(let i in obj) {
        if(typeof obj[i] === 'object') {
            let flag = false;
            parentArr.forEach((pObj) => {
                if(pObj === obj[i]){
                    flag = true;
                }
            })
            if(flag) return true;
            flag = isCycleObject(obj[i],[...parentArr,obj[i]]);
            if(flag) return true;
        }
    }
    return false;
}
//自己想的
function isReRef(obj,map = new Map()){
    if(!(obj instanceof Object)) throw new TypeError('the parameter is not a object');
    if(!map.size) map.set(obj,obj)
    for (const k in obj) {
        if (Object.hasOwnProperty.call(obj, k)) {
            const el = obj[k];
            //是对象的情况
            if(el instanceof Object){
                //判断map中是否有
                if(map.has(el)){
                    //中断所有检查，返回true
                    return true
                }else{
                    map.set(el,el)
                    //如果isReRef返回的是true，则返回true,否则不做处理。
                    let flag =  isReRef(el,map)
                    if(flag) return true;
                    //41,42行一开始写错了，写成了下面,这样是不行的，如果第二个isRef执行完所有，返回了false，整个也会返回false
                    //return isReRef(el,map)
                }
            }
        }
    }
    //全部检查完，无引用则返回false
    return false
}
// o.c.b.aa = a;//false,false
// o.c.b.aa = b;//true,true
// o.c.b.aa = c;//true,true
o.c.b.aa = o;//true,true
console.log(isCycleObject(o))
console.log(isReRef(o))