//验证回文字符串

/**
 * aba123bada
 * 无视字母大小写，忽略除开字母和数字的其他符号
 * 
 */

function reString(str) {
    //准备两个指针，左指针和右指针
    let left = 0;
    let right = str.length - 1;
    //循环判断，左指针和右指针对应的元素是否相等，如果有不等的，说明不是回文字符串，反之则是。
    while (left < right) {
        //排除不是数字和字母的情况
        if (!isValid(str[left].toLowerCase())) {
            left++
        } else if (!isValid(str[right].toLowerCase())) {
            right--
        } else if (str[left] === str[right]) {
            left++;
            right--
        } else {
            return false
        }
    }
    return true
}
let isValid = target => (target >= 'a' && target <= 'z') || (target >= 0 && target <= 9)

console.log(reString('1234,.,,,32。1'))