/**
 * 对象扁平化
 * 将{ a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } },
 * 转化为：{ 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f.g': 2 }
 * 
 */
// 测试
const source = {
    a: {
        b: {
            c: 1,
            d: 2
        },
        e: 3
    },
    f: {
        g: 2
    }
}
function objectFlat(item, preKey = '',res={}) {
    for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
            let newK = preKey ? `${preKey}.${key}` : key
              if (item[key] && typeof item[key] === 'object') {
                objectFlat(item[key], newK,res)
              } else {
                res[newK] = item[key];
              }
            
        }
    }
    return res
}

console.log(objectFlat(source));