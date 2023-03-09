let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13];
function log(arr){
    let item = arr.pop();
    console.log(item);
    if(arr.length>0) log(arr)
}
log(arr)