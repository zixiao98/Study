/**
 * 给定一个url数组和一个最大并发数maxNum
 * 
 * 要求每次并发请求最多只能有maxNum个，并且一个完成之后，立马发送下一个
 * 最终返回的结果数组的顺序要和url顺序一致。
 *  
 */

function MaxRequestAsync(urls, maxNum) {
    return new Promise(resolve => {
        //处理特殊情况，url为空
        if (urls.length === 0) {
            resolve()
            return;
        }
        //返回的结果数组
        const res = [];
        let index = 0; //下一个url的 下标
        async function request() { //辅助发送请求函数
            const i = index; //返回结果与url顺序保持一致
            let url = urls[index++];
            try {
                const resp = await fetch(url);
                res[i] = resp;
            } catch (error) {
                res[i] = error;
            } finally {
                if (index === urls.length) { //判断是否边界
                    resolve(urls)
                    return;
                }
                //执行下一个请求
                request()
            }
        }
        //控制并发个数
        //需要判断urls长度是否大于maxNum
        if (urls.length < maxNum) maxNum = urls.length;
        for (let i = 0; i < maxNum; i++) {
            request()
        }
    })
}



//执行代码
let urls = [];
for (let i = 0; i < 2; i++) {
    urls.push(`url/promise/${i}`)
}
MaxRequestAsync(urls, 3).then(res => console.log(res))


//思路：
//化繁为简，并发请求控制，
/**
 * 
 * 1.并发请求用循环即可，控制则可以通过循环的长度来实现
 * 2.一个请求结束过后，立刻开启下一个请求
 * 
 */


function QuestAsyncCtl(urls, maxSum) {
    //首先得对参数进行判断
    if (!Array.isArray(urls)) return;
    if (!typeof maxSum == 'number') return;

    //返回一个promise实例
    return new Promise((resolve) => {
        let res = []; //返回结果
        let index = 0; //下一个url的下标
        //判断数组是否为空
        if (urls.length == 0) {
            resolve(res)
            return;
        }
        //发送请求的辅助函数
        async function request() {
            const i = index; //保存结果的下标，对应URL顺序
            const url = urls[index++]; //获取对应的url，并将下标指向下一个url
            try {
                const req = await fetch(url);
                res[i] = req;
            } catch (err) {
                res[i] = err;
            } finally {
                //是否已经完成所有请求
                if (index == urls.length) {
                    resolve(res)
                    return;
                }
                //调用下一个请求
                request()
            }

        }

        //并发请求并控制最大数量
        if(urls.length<maxSum) maxSum = urls.length;
        for (let i = 0; i < maxSum; i++) {
            request()
        }
    })
}