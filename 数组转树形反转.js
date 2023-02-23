let treeArr = [{
    "id": 1,
    "name": "部门1",
    "parentId": 0,
    "children": [{
        "id": 2,
        "name": "部门2",
        "parentId": 1,
        "children": null
    }, {
        "id": 3,
        "name": "部门3",
        "parentId": 1,
        "children": [{
            "id": 4,
            "name": "部门4",
            "parentId": 3,
            "children": [{
                "id": 5,
                "name": "部门5",
                "parentId": 4,
                "children": null
            }]
        }]
    }]
}]

/**
 * 树形转数组
 *  1，查找每一项的孩子节点，并且拿出来放到[]中，最后形成一个一维数组。
 * 
 * 
 */
//递归版本
function TreetoArr(tree, arr = []) {
    for (let i = 0; i < tree.length; i++) {
        let {
            id,
            name,
            parentId,
            children = []
        } = tree[i];
        arr.push({
            id,
            name,
            parentId
        }) //最终要取只有这三项
        //如果有孩子节点的话，继续添加到arr
        if (children && children.length > 0) arr.push(...TreetoArr(children))
    }
    return arr
}
//循环版本，利用到栈的原理
function TreetoArr(tree, stack = [], res = []) {
    //入栈
    stack = [...tree];
    for (let i = 0; i < stack.length; i++) {
        let {
            id,
            name,
            parentId,
            children
        } = stack[i];
        res.push({
            id,
            name,
            parentId
        })
        if(children && children.length>0) stack.push(...children)//存在子节点的，继续入栈，i往前走，因此元素无需出栈
    }
    return res
}
let res = TreetoArr(treeArr);
res[2].id = 12
console.log(res)
console.log(treeArr[0].children)