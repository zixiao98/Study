/**
 * 给定两个数字，输出其相加的结果
 * 思路：
 *     1.两个数字可能长度不同，需要对其补0，使其长度相同
 *     2.将其转成两个字符串数组，对两个数组的每一个项进行对应相加，并加上进位，记录进位是否产生进位
 *     3.完成相加之后，检查最后是否产生了一个进位，是的话，最后得补上进位的1。
 */
function BigNumSum(NumA, NumB) {
    //边界处理
    if (typeof NumA !== 'number') throw new Error('the first parameter is not a number');
    if (typeof NumB !== 'number') throw new Error('the second parameter is not a number');

    let stringA = String(NumA);
    let stringB = String(NumB);

    //比较长度，进行补0操作，并分隔成字符串数组
    let ZeroLen = stringA.length > stringB.length ? stringA.length : stringB.length;
    let NumAarr = stringA.padStart(ZeroLen, '0').split('');
    let NumBarr = stringB.padStart(ZeroLen, '0').split('');

    let carry = 0; //进位
    let result = [];
    for (let i = ZeroLen - 1; i >= 0; i--) {
        let res = Number(NumAarr[i]) + Number(NumBarr[i]) + carry;
        if (res > 9) { //取余进一
            res = res % 10;
            carry = 1;
        } else {
            carry = 0;
        }
        result.unshift(res)
    }
    //最后是否要进一
    if (carry) result.unshift(1)
    return BigInt(result.join(''))
}

console.log(BigNumSum(23123131231231889, 13123801721232139123))
