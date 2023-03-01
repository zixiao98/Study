//实现发布订阅模式 类似于中间商，维持了一份订阅类型-回调函数的对象表，如果有订阅类型发布，那么表内对应的回调函数也会被触发
//发布者，订阅者，和调度中心(真的需要实现)，其余两个只是作为使用调度中心的用户就可，发布者和订阅者的关系是多对多

class dispatchhanders {

    constructor() {
        this.handers = {}; // 订阅类型-回调事件 存储库对象
    }

    //订阅事件
    on(type, cb) {
        //判断存储库里面是否已经有对应事件
        if (type in this.handers) {
            this.handers[type].push(cb);
        } else {
            this.handers[type] = [cb];
        }
    }

    //发布事件
    dispatch(type, ...args) {
        //判断是否有该订阅类型存在
        if (type in this.handers) {
            //执行事件
            this.handers[type].forEach(e => {
                e(...args)
            })
        } else {
            throw new Error('there is not about event type is ' + type)
        }
    }

    //删除订阅事件,若只有单一参数，删除整个订阅，有第二个参数，删除目标订阅的回调事件
    deleteEvent(type, cb) {
        if (type in this.handers) {
            if (!cb) {
                delete this.handers[type];
            } else {
                //获取到回调事件的下标
                let index = this.handers[type].indexOf(cb); //cb事件要有事件名
                if (index === -1) {
                    throw new Error('there is not about event callback is ' + cb);
                } else {
                    //删除对应订阅类型的回调事件
                    this.handers[type].splice(index, 1);
                    //判断删除回调函数之后，订阅类型的回调事件数组是否为空
                    if (this.handers[type].length === 0) delete this.handers[type]
                }
            }
        } else {
            throw new Error('there is not about event type is ' + type)
        }
    }

}
let myhanders = new dispatchhanders(); //创建调度中心实例
myhanders.on('起床', () => {
    console.log('我起床了')
})
myhanders.on('起床', () => {
    console.log('我刷牙了')
})
let ls = function () {
    console.log('我刷牙了')
}
myhanders.on('起床l', ls) //订阅者调用
myhanders.dispatch('起床') //发布者调用
myhanders.deleteEvent('起床l', ls) //订阅者调用
console.log(myhanders)

//观察者模式:对一份主题的观察，当主题发生变化时候，通知所有主题的观察者更新，主题和观察者的关系是一对多
//主题和观察者
/**
 * 观察者：有自己的执行事件，等主题有相关通知时候，执行
 * 主题：保存了大量观察者，当主题发生变化时，通知观察者执行事件
 */


class Obsever {
    constructor(name) {
        this.name = name;
    }
    //观察者的更新操作
    update(...args) {
        console.log(this.name+'执行更新')
        console.log(args)
    }
}

class Subject {
    constructor() {
        //观察者列表
        this.obseverList = [];
    }
    //添加观察者
    addObsever(ob) {
        //判断ob是否是Obsever类型
        if (!(ob instanceof Obsever)) {
            throw new TypeError('the ' + ob + ' is not a Obsever Class instance')
        } else {
            this.obseverList.push(ob)
        }
    }
    //删除观察者
    deleteObsever(ob) {
        //判断ob是否存在于观察者列表内
        let index = this.obseverList.indexOf(ob);
        if (index === -1) {
            throw new Error('未发现该观察者')
        } else {
            this.obseverList.splice(index, 1)
        }
    }
    //通知观察者主题有变化，需执行回调
    notify(...agrs) {
        this.obseverList.forEach(e => {
            e.update(...agrs)
        })
    }
}

let subject = new Subject();
let ob1 = new Obsever('lzj1');
let ob2 = new Obsever('lzj2');
let ob3 = new Obsever('lzj3');
let ob4 = new Obsever('lzj4');
subject.addObsever(ob1)
subject.addObsever(ob2)
subject.addObsever(ob3)
subject.addObsever(ob4)
subject.notify(1,2,3,4)
console.log(subject,ob1)