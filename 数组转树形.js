// const oldData = [{
//         id: 1,
//         name: 'boss',
//         parentId: 0
//     },
//     {
//         id: 2,
//         name: 'lily',
//         parentId: 1
//     },
//     {
//         id: 3,
//         name: 'jack',
//         parentId: 1
//     },
//     {
//         id: 4,
//         name: 'john',
//         parentId: 2
//     },
//     {
//         id: 5,
//         name: 'boss2',
//         parentId: 0
//     },
// ];
const oldData = [{
        id: 1,
        name: '部门1',
        parentId: 0
    },
    {
        id: 2,
        name: '部门2',
        parentId: 1
    },
    {
        id: 3,
        name: '部门3',
        parentId: 1
    },
    {
        id: 4,
        name: '部门4',
        parentId: 3
    },
    {
        id: 5,
        name: '部门5',
        parentId: 4
    },
]

/**
 *  将数组转为树形，其实就是找儿子的过程 (递归)/找父亲的过程(循环+map)
 *   1.找出所有根节点，并返回到根节点数组
 *   2.把根节点的后端节点递归找出来
 * 
 */
//第一代方法(递归)
function _toTree(arr, flags = true, rootNode = [], ret = []) {
    //步骤一：找出所有根节点
    if (flags) {
        for (let i = 0; i < arr.length; i++) {
            //判断是否存在父节点，存在则跳过
            let flag = arr.every(item => arr[i].parentId !== item.id);
            if (flag) rootNode.push({
                ...arr[i]
            });
        }
    }
    //迭代找出所有根节点的后代节点
    for (let j = 0; j < rootNode.length; j++) {
        let {
            id,
            name,
            parentId,
            children = []
        } = rootNode[j]; //解构赋值
        children = arr.filter(item => rootNode[j].id == item.parentId)
        let resp = children.length > 0 ? _toTree(arr, false, children) : []
        ret.push({
            id,
            name,
            parentId,
            children: [...resp]
        })
    }

    return ret
}
//第二代方法(递归)
//找出所有根节点
function getRootNode(arr) {
    // let res = [];
    // arr.forEach(e => {
    //     if (arr.every(item => item.id != e.parentId)) res.push(e);
    // })
    // return res;
    //优化 ->过滤出数组所有项的id都没有对应其父id的项就是根节点
    return arr.filter(e => arr.every(es => es.id !== e.parentId))
}
//递归找出根节点的所有后代节点
function _toTreeUpdate(arr, rootNode = getRootNode(arr), ret = []) {
    for (let i = 0; i < rootNode.length; i++) {
        let {
            id,
            name,
            parentId,
            children = []
        } = rootNode[i];
        children = arr.filter(e => e.parentId == rootNode[i].id)
        let resp = children.length > 0 ? _toTreeUpdate(arr, children) : children;
        ret.push({
            id,
            name,
            parentId,
            children: resp.length > 0 ? resp : null //没有孩子节点则为null
        })
    }
    return ret
}

//第二种方法：(map＋循环)
function MaptoTree(arr, map = new Map()) {
    //将所有的项，写入map
    arr.forEach(e => {
        map.set(e.id, {
            ...e
        }) //这里使用展开运算符克隆了对象
    })
    //给map每一项找父亲
    let keys = [...map.keys()] //重要：保存了最原始的keys
    for (const [k, v] of map) {
        if (keys.includes(v.parentId)) {
            //找到父节点
            let target = map.get(v.parentId);
            if (!target.children) target.children = []; //初始化一个孩子节点数组
            target.children.push(map.get(k))
        }
    }
    // console.log(map)
    //将根节点单独挑选出来
    for (const [k, v] of map) {
        if (keys.includes(v.parentId)) map.delete(k) //这里需要在之前保存的keys中查找，不能用map.has(v.parentId)因为map删除了一些项
    }
    return [...map.values()]

}
console.log(_toTree(oldData))
console.log(_toTreeUpdate(oldData))
console.log(MaptoTree(oldData)[0])
console.log(MaptoTree(oldData)[0].children)