/**
 * Definition for singly-linked list.
 * 
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
//链表的构造函数
function ListNode(val) {
    this.val = val;
    this.next = null;
}
//构建链表
function createNode(arr) {
    let head = null;
    let next = null;
    for (let i = 0; i < arr.length; i++) {
        if (!head) {
            head = new ListNode(arr[i]);
            next = head;
        } else {
            next.next = new ListNode(arr[i]);
            next = next.next;
        }
    }
    return head
}
let listNode = createNode([1, 2, 3, 4, 5, 6, 7, 8])
// console.log(listNode)

/**
 * 删除指定的节点
 * @param {*} head 链表
 * @param {ListNode} node 要指定删除的节点
 * @returns 
 */
var deleteNode = function (nodeList, node) {
    let next = nodeList;
    while (next) {
        if (node == next.val && next.next) {
            //覆盖操作，把目标的下一个的值覆盖到目标上，并让目标只想下一个值的下一个指向
            next.val = next.next.val;
            next.next = next.next.next;
        } else {
            next = next.next
        }
    }
    return nodeList
};
// let newList = deleteNode(listNode,21)
// console.log(newList)



/**
 * 删除倒数第几个结点
 * @param {*} head 链表的头指针
 * @param {*} n 倒数第几个
 * @returns 
 */
var removeNthFromEnd = function (head, n) {
    let cur = head;
    //链表的长度
    let length = nodelistLen(head);
    let index = length - n - 1; //要找的位置
    //头结点的位置
    if (index == -1) return head = head.next;
    //找到目标节点的前一个节点
    while (index > 0) {
        index--;
        if (cur.next) {
            cur = cur.next
        } else {
            cur.next = null
        }
    }
    //屏蔽了目标节点
    cur.next = cur.next.next
    return head
};
//获取链表的长度
let nodelistLen = function (nodelist) {
    let next = nodelist;
    let len = 1;
    while (next.next) {
        len++;
        next = next.next
    }
    return len
}
// console.log(removeNthFromEnd(listNode, 3))

/**
 * 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // if (!head || !head.next) return head
    // let next = head;
    // let stack = [];
    // while (next) {
    //     stack.push({
    //         val: next.val,
    //         next: null
    //     })
    //     next = next.next;
    // }
    // //利用出栈构建反转链表
    // let target = null;
    // let nexts = null; //指向下一个next
    // while (stack.length > 0) {
    //     if (!target) {
    //         nexts = target = stack.pop();
    //     } else {
    //         nexts.next = stack.pop();
    //         nexts = nexts.next
    //     }

    // }
    // return target
    //新解法
    if(!head) return head;
    let res = [];
    let next = head;
    while(next){
        res.push(next.val)
        if(next.next){
            next = next.next
        }else{
            break;
        }
    }
    //重新构建链接
    let heads = null;
    let nexts = null;
    let i = 0;
    while(i<res.length){
        if(!heads) {
            heads =new ListNode(res[i]);
            nexts = heads
        }else{
            nexts.next =new ListNode(res[i]);
            nexts = nexts.next
        }
        i++
    }
    return heads
};
var reverseList = function (head) {
    if (!head || !head.next) return head; //边界处理
    let curHead = head;
    let curNext = head.next;
    while (curNext) {
        //需要画图理解
        curHead.next = curNext.next;
        curNext.next = head;
        head = curNext;
        curNext = curHead.next;
    }
    return head

};
console.log(reverseList(listNode))

/**
 * 合并两个升序链表
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    if (!list1 && !list2) return null;
    if (!list1 && list2) return list2;
    if (list1 && !list2) return list1;
    let left = list1;
    let right = list2;
    let newList = null;
    let next = null;
    while (left || right) {
        //左边放入的情况 ： 1.右边不存在 2两边存在，且左边小于等于右边的时候
        if (right == null || left && left.val <= right.val) {
            if (!newList) {
                newList = {
                    val: left.val,
                    next: null
                }
                next = newList;
            } else {
                next.next = {
                    val: left.val,
                    next: null
                };
                next = next.next;
            }
            left = left.next
        } else { //右边放入情况的情况：1.左边不存在 2两边存在，且右边小于左边的时候
            if (!newList) {
                newList = {
                    val: right.val,
                    next: null
                }
                next = newList;
            } else {
                next.next = {
                    val: right.val,
                    next: null
                };
                next = next.next;
            }
            right = right.next
        }
    }
    return newList
};
let list1 = createNode([1, 2, 4])
let list2 = createNode([1, 3, 4])
// console.log(mergeTwoLists(list1, list2))

/**
 * 验证回文链表
 * @param {ListNode} head
 * @return {boolean}
 * 
 * 链表中节点数目在范围[1, 105] 内
 * 0 <= Node.val <= 9
 */
let Palindrome = createNode([1, 2, 4, 1, 5, 1, 3, 4, 2, 1])
var isPalindrome = function (head) {
    let stack = [];
    let next = head;
    while (next) {
        stack.push(next.val)
        next = next.next
    }
    let left = 0;
    let right = stack.length - 1;
    while (left < right) {
        if (stack[left] === stack[right]) {
            left++;
            right--
        }else{
            return false
        }
    }
    return true
};
// console.log(isPalindrome(Palindrome))

/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let map = new Map();
    let next = head;
    while(next){
        if(map.has(next)) return true
        map.set(next,next)
        next = next.next;
    }
    return false
};
