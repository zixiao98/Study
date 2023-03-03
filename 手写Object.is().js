/**
 * Object.is() 方法判断两个值是否为同一个值，如果满足以下任意条件则两个值相等：
    都是 undefined
    都是 null
    都是 true 或都是 false
    都是相同长度、相同字符、按相同顺序排列的字符串
    都是相同对象（意味着都是同一个对象的值引用）
    都是数字且
    都是 +0
    都是 -0
    都是 NaN
    都是同一个值，非零且都不是 NaN
    Object.is() 与 == 不同。== 运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（这种行为将 "" == false 判断为 true），而 Object.is 不会强制转换两边的值。
    Object.is() 与 === 也不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN 与 NaN 视为不相等。
 */
    //主要记住，Object.is与===的区别，前者中，NaN与NaN相等，+0与-0不等
    /**
     * 思路：利用===判断,为true时，需要区别出+0和-0，返回false，其余返回true，为false时需要区别出NaN与NaN，返回true，其余返回false
     * 判断+0与-0,可以利用1/+0===infinity 1/-0===-infinity,即是1/-0!==1/+0的
     * 判断是不是NaN，可以利用Number.isNaN方法来判断
    */
    console.log(Object.is(NaN,NaN))
    console.log(Object.is(+0,-0))
    console.log(Object.is(0,0))
    console.log(Object.is(1,2))
    function myObjectIs(v1,v2){
        //只需排除+0和-0的情况
        if(v1===v2){
            //+0和-0的情况
            if(v1==0 && 1/v1!==1/v2) {
                return false
            }else{
                return true
            }
        }else{
            //只需排除NaN与NaN的情况
            if(Number.isNaN(v1)&&Number.isNaN(v2)) return true
        }
        return false;
        //一句话版本
        return v1 === v2 ? !(v1 == 0 && 1 / v1 !== 1 / v2) : Number.isNaN(v1) && Number.isNaN(v2) ;
    }
    console.log('====================================');
    console.log(myObjectIs(NaN,NaN))
    console.log(myObjectIs(+0,-0))
    console.log(myObjectIs(0,0))
    console.log(myObjectIs(1,2))
    console.log('====================================');
    
    