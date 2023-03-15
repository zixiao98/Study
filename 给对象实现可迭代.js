let obj = {
    a:1,
    b:2,
    c:3,
    d:4,
    [Symbol.iterator](){
        let keys = Object.keys(this);
        let i = -1;
        let self = this;
        return {

            next(){
                i++;
                if(i<keys.length){
                    return {
                        value:self[keys[i]],
                        done:false
                    }
                }else{
                    return {
                        value:null,
                        done:true
                    }
                }
            }

        }
    }
}
console.log(obj)
for (const i of obj) {
    console.log(i)
}