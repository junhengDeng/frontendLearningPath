// 1. 栈 后进先出
// 2. 队列 先进先出
// 3. 链表 不连续存储，用next返回下一个节点
// 4. 集合 唯一且无序
// 5. 字典（hash） 唯一 键值对
// 6. 树 分层 dom树
// 7. 图 二元关系
// 8. 堆 特殊的完全二叉树

// 前序\中序\后序 遍历二叉树
/**
                A
              /   \
             B     C
           /  \    /
          D    E  F
 */
// 前序 
// 根左右
// ABDECF

// 中序
// 左根右
// DBEAFC

// 后序
// 左右根
// DEBFCA

// 栈
// 后进先出
(() => {
  const stack = [];
  // 入栈
  stack.push();
  // 出栈
  stack.pop();
});
// 使用场景
// 1.十进制转二进制
// 2.有效括号
// 3.函数调用堆栈
// leetCode题目
// 20.有效括号
(() => {
  // 给定一个只包括 () [] {} 的字符串 s，判断字符串是否有效
  // 1.左括号必须用相同类型的右括号闭合
  // 2.左括号必须以正确的顺序闭合
  // 3.每个右括号都有一个对应的相同类型的左括号
  // s = '()' true
  // s = '()[]{}' true
  // s = '(]' false

  // 思路
  // 1. 识别到左边的值,就放入
  // 2. 识别到右边的值,拿最后一个出来比对,比对失败就返回错误
  // 3. 循环走完,如果还有值,说明没有匹配干净,报错
  function ValidParentheses (str) {
    var stack = [];
    var len = str.length;
    var k = 0;
    var left = ['{', '[', '('];
    var right = ['}', ']', ')'];
    while (k < len) {
      const val = str[k];
      if (left.includes(val)) {
        stack.push(val);
      } else if (right.includes(val)) {
        const leftVal = stack.pop();
        if (left.indexOf(leftVal) !== right.indexOf(val)) {
          return false;
        }
      }
      k++;
    }
    return !stack.length;
  }

  var a1 = '()';
  var a2 = '()[]{}';
  var a3 = '(]';
  ValidParentheses();
});
// 144.二叉树的前序遍历
(() => {
  // 给你二叉树的根节点root,返回它节点值的 前序遍历
  /* 例子1
    1
      \
        2
      /
    3
  */
  // root = [1, null, 2, 3]; //[1,2,3]
  // root = []; //[]
  // root = [1]; //[1]

  /* 例子2
       1
      /
    2
  */
  // root = [1,2] //[1,2]

  /* 例子3
    1
      \
       2
  */
  // root = [1, null, 2] // [1,2]

  /**
   * Definition for a binary tree node.
   * function TreeNode(val, left, right) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.left = (left===undefined ? null : left)
   *     this.right = (right===undefined ? null : right)
   * }
   */
  /**
   * @param {TreeNode} root
   * @return {number[]}
   */
  // 时间复杂度(O(n)),n为节点个数,空间复杂度(O(n)),即递归的空间开销(树的高度),最坏的情况下

  // 思路
  // 1.前序: 中左右 1.判断node 2.push/fn/fn
  //   中序: 左中右 1.判断node 2.fn/push/fn
  //   后序: 左右中 1.判断node 2.fn/fn/push

  // 前序遍历
  var preorderTraversal = function (root, res = []) {
    if (!root) return res;
    res.push(root.val);
    preorderTraversal(root.left, res);
    preorderTraversal(root.right, res);
    return res;
  };
  // 中序遍历
  var inorderTraversal = function (root, res = []) {
    if (!root) return res;
    inorderTraversal(root.left);
    res.push(root.val);
    inorderTraversal(root.right);
    return res;
  };
  // 后序遍历
  var postorderTraveral = function (root, res = []) {
    if (!root) return res;
    postorderTraveral(root.left);
    postorderTraveral(root.right);
    res.push(root.val);
    return res;
  };

});

// 队列
// 先进先出
(() => {
  const stack = [];
  // 入列
  stack.push();
  // 出列
  stack.shift();
});
// 使用场景
// 1.日常核酸排队
// 2.js异步中的任务队列
// 3.计算最近请求次数
// leetCode 题目
// 993.最近的请求次数
(() => {
  // 写一个 RecentCounter 类来计算特定时间范围内最近的请求
  // 请你实现 RecentCounter 类
  // 1.RecentCounter() 初始化计数器,请求数为 0
  // 2.int ping(int t)在时间t添加一个新请求,其中t表示以毫秒为单位的某个时间,并返回过去 3000 毫秒内发生的所有请求数(包括新请求).确切地说,返回在[t-3000, t]内发生的请求数
  // 保证每次对 ping 的调用都是用比之前更大的 t 值

  // 示例1:
  //   输入：
  //   ["RecentCounter", "ping", "ping", "ping", "ping"]
  //   [[], [1], [100], [3001], [3002]];
  //   输出：
  //   [null, 1, 2, 3, 3];

  //   解释：
  // RecentCounter recentCounter = new RecentCounter();
  //   recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
  //   recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
  //   recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
  //   recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3


  // 思路:
  //    1. 先将 t 放进去
  //    2. 将前面 t - 3000 的剔除
  //    3. 返回提出后的值的长度
  var RecentCounter = function () {
    this.values = [];
  };

  /** 
   * @param {number} t
   * @return {number}
   */
  RecentCounter.prototype.ping = function (t) {
    // 只保留t-3000以内的值;
    this.values.push(t);

    while (this.values[0] < t - 3000) {
      this.values.shift();
    }
    return this.values.length;
  };

  /**
   * Your RecentCounter object will be instantiated and called as such:
   * var obj = new RecentCounter()
   * var param_1 = obj.ping(t)
   */
});


// 链表
// 多个元素组成的列表,元素存储不连续,用next指针连载一起.
(() => {
  interface ILinkListNode {
    value: number;
    next?: ILinkListNode;
  }
  /**
   * 根据数组创建单项链表
   * @param arr 
   * @returns
   */
  function createLinkList (arr: number[]): ILinkListNode {
    const len = arr.length;
    if (len === 0) throw new Error('arr is empty');

    let curNode: ILinkListNode = {
      value: arr[len - 1]
    };
    // 用数组的最后一个元素 创建第一个链表
    if (len === 1) return curNode;

    // len - 2; 代表数组的倒数第二个元素
    for (let i = len - 2; i >= 0; i--) {
      curNode = {
        value: arr[i],
        next: curNode
      };
    }

    return curNode;
  }
});
// 使用场景
// 1.js 中的原型链
// 2.使用链表指针获取
// leetcode 的题目
// 237.删除链表中的节点
(() => {
  // 有一个单链表的head, 我们像删除它其中的一个节点node;
  // 给你一个需要删除的节点node.你将 无法访问 第一个节点head
  // 链表的所有制都是 唯一的, 并且保证给定的节点 node 不是链表中的最后一个节点.
  //   删除给定的节点.注意删除节点并不是指从内存中删除它.这里的意思是:
  // 在定节点的指不应该存在于链表中;
  // 链表中的节点数应该减少1;
  // node前面的所有值顺序相同;
  // node后面的所有值顺序相同;
  //   自定义测试：

  //   对于输入，你应该提供整个链表 head 和要给出的节点 node。node 不应该是链表的最后一个节点，而应该是链表中的一个实际节点。
  //   我们将构建链表，并将节点传递给你的函数。
  //   输出将是调用你函数后的整个链表。
  /* 示例1
    4 -> 5 -> 1 -> 9
         ^
    4 -> 1 -> 9
  */
  // 输入：head = [4,5,1,9], node = 5
  // 输出：[4,1,9]
  // 解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9

  /**
   * Definition for singly-linked list.
   * function ListNode(val) {
   *     this.val = val;
   *     this.next = null;
   * }
   */
  /**
   * @param {ListNode} node
   * @return {void} Do not return anything, modify node in-place instead.
   */
  // 思路
  // 1. node.next 都写好了
  // 2. 当前的引用不变,将val替换成下一个node的val,next换成下一个node的next
  var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
  };
});
// 206.反转链表
(() => {
  // 给你单链表的头节点head, 请你反转链表, 并返回反转后的链表;
  /* 示例1
  1 -> 2 -> 3 -> 4 -> 5
  
  5 -> 4 -> 3 -> 2 -> 1
  */
  // 输入：head = [1,2,3,4,5]
  // 输出：[5,4,3,2,1]

  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  /*
   两种思路,
     1. 设置 左中右 三个变量, 像滚动一样(弹链),指定好右边的(下一个),操作中间的,操作完丢到左边,左边的像打废弃的子弹, 左边的可以随便操作;
              左   中   右
              O    O    O
            1.     ^          压入一发子弹到击发位的弹链
            2.     ^    ^     压入下一发子弹到待击发的弹链
            3.     X    ^     击发(操作该数据)
            4.X    ^          滚动弹链
            5.X    ^    ^     压入下一发子弹到待击发的弹链
            6.X    X    ^     击发(操作该数据)
            7.X    ^          滚动弹链
            8.X    ^    ^     压入下一发子弹到待击发的弹链
     2. 一直跑到末尾, 从末尾开始往回收;
  */
  var reverseList1 = function (head) {
    let left = middle = right = null;
    middle = head; // 压入第一发
    while (middle) {
      right = middle.next; // 压入待击发
      middle.next = left; // 击发
      left = middle; // 滚动弹链
      middle = right;
    }
    // 当击发位,没有子弹了,返回left
    return left;
  };

  var reverseList2 = function (head) {
    let res = head;
    function fn (preNode, node) {
      if (node.next) {
        fn(node, node.next);
      } else {
        // 如果没有node.next, 说明是最后一个,这个将成为链首;
        res = node;
      }

      node.next = preNode;
    }
    head && fn(null, head);

    return res;
  };
});
// 2.两数相加
(() => {
  // 给你两个 非空 的链表,表示两个非负的整数.他们每个数字都是按照 逆序 的方式存储的,并且每个节点只能存储 一位 数字
  // 请你将两个数相加,并以相同形式返回一个表示和的链表
  // 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
  /* 示例1
    2 -> 4 -> 3
    5 -> 6 -> 4
    -----------
    7 -> 0 -> 8
    输入：l1 = [2,4,3], l2 = [5,6,4]
    输出：[7,0,8]
    解释：342 + 465 = 807.
  */
  /* 示例2
    输入：l1 = [0], l2 = [0]
    输出：[0]
   */
  /* 示例3
    输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    输出：[8,9,9,9,0,0,0,1]
   */

  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  // 思路
  // 1. 设置一个flag,代表进一位
  // 2. 如果当前都没值了,flag还在,那要继续创建一个节点
  var addTwoNumbers = function (l1, l2) {
    let flag = false;

    let l1Node = l1;
    let l2Node = l2;

    let tail = null;
    let head = null;
    while (flag || l1Node || l2Node) {
      var l1Val = l1Node && l1Node.val || 0;
      var l2Val = l2Node && l2Node.val || 0;

      var totalVal = l1Val + l2Val + Boolean(flag);
      flag = totalVal >= 10;

      var currVal = totalVal % 10;

      var currNode = new ListNode(currVal);

      if (tail) {
        tail.next = currNode;
        tail = currNode;
      } else {
        tail = currNode;
        head = currNode;
      }

      l1Node && (l1Node = l1Node.next);
      l2Node && (l2Node = l2Node.next);
    }

    return head;
  };
});
// 83.删除排序链表中的重复元素
(() => {
  // 给定一个已排序的链表的头head,删除所有重复的元素,使每个元素只出现一次,返回已排序的链表
  /** 示例1
   1 -> 1 -> 2
   -----------
   1 -> 2

    输入：head = [1,1,2]
    输出：[1,2]
   */
  /** 示例1
   1 -> 1 -> 2 -> 3 -> 3
   -----------
   1 -> 2 -> 3

    输入：head = [1,1,2,3,3]
    输出：[1,2,3]
   */
  /**
    * Definition for singly-linked list.
    * function ListNode(val, next) {
    *     this.val = (val===undefined ? 0 : val)
    *     this.next = (next===undefined ? null : next)
    * }
    */
  // 思路
  // 1. 需要一个记录表,Set
  // 2. 与上面的思路一样,压上三个变量
  // 3. 操作中间的,
  // 4. 可以的放到左边,不行的,中间的丢弃
  // 5. 右边的放到左边
  // 错了,这里是已排序列表,不需要记录表
  // 换思路
  // 1. 当前的与下一个对比,可以的,替换当前,否则当前的next = 当前的next的next
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  var deleteDuplicates = function (head) {
    if (!head) return head;
    var curr = head;
    while (curr.next) {
      if (curr.val !== curr.next.val) {
        curr = curr.next;
      } else {
        curr.next = curr.next.next;
      }
    }
    return head;
  };
});
// 141. 环形链表
(() => {
  // 给你一个链表的头节点 head ，判断链表中是否有环。
  // 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
  // 如果链表中存在环 ，则返回 true 。 否则，返回 false 。

  /** 示例1
   3 -> 2 -> 0 -> -4
        ^__________|

      输入：head = [3,2,0,-4], pos = 1
      输出：true
      解释：链表中有一个环，其尾部连接到第二个节点。
   */

  // 思路
  // 1. 有个记录表

  /**
   * Definition for singly-linked list.
   * function ListNode(val) {
   *     this.val = val;
   *     this.next = null;
   * }
   */

  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  var hasCycle = function (head) {
    var curr = head;
    var set = new Set();
    set.add(head);
    while (curr.next) {
      if (set.has(curr.next)) return true;

      set.add(curr.next);
      curr = curr.next;
    }
    return false;
  };

  // 网上解题思路(不用hash)
  // 双指针, 若是环形链表快指针总会和慢指针相遇
  var hasCycle2 = function (head) {
    if (head === null) return false;
    let slow = head, fast = head.next;
    while (fast && fast.next) {
      if (slow.next === fast.next.next) return true;
      slow = slow.next;
      fast = fast.next.next;
    }

    return false;
  };

});


// 集合
// 集合是一个无序且唯一的数据结构,常用操作:去重,判断某元素是否在集合中,求交集
(() => {
  // 去重
  const arr = [...new Set()];
  // 是否在集合中
  set.has();
  // 求交集
  const set = new Set([1, 1, 2, 2]);
  const set2 = new Set([2, 3]);
  const set3 = new Set([...set].filter(item => set2.has(item)));
});
// 使用场景
// 1. 求交集\差集
// leetcode题目
// 349 两个数组的交集
(() => {
  // 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

  //   示例 1：

  //   输入：nums1 = [1, 2, 2, 1], nums2 = [2, 2];
  //   输出：[2]

  //   示例 2：
  //   输入：nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4];
  //   输出：[9, 4];
  //   解释：[4, 9] 也是可通过的;
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  var intersection = function (nums1, nums2) {
    var set1 = new Set(nums1);
    var set2 = new Set(nums2);
    return [...[...set1].filter(i => set2.has(i))];
  };
});

// hash
// 字典也是一种存储 唯一值 的数据结构,但它以 键值对 的形式存储
(() => {
  const map = new Map();
  map.set('key1', 'value1');
});
// 使用场景
// leetcode题目
// 1.两数之和
(() => {
  // 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
  // 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
  // 你可以按任意顺序返回答案。
  // 只会存在一个有效答案
  /*
    示例 1：
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

    示例 2：
    输入：nums = [3,2,4], target = 6
    输出：[1,2]

    示例 3:
    输入：nums = [3,3], target = 6
    输出：[0,1]
  */
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number[]}
   */
  var twoSum = function (nums, target) {
    /*
    // 思路1 只存在一个有效答案
    //  将所有的可能性,都写下来,并且将相加的值保留下来
    //  双循环
    //  非常耗时
    var hash = new Map();
    for (var i = 0; i < nums.length; i++) {
      for (var j = i + 1; j < nums.length; j++) {
        var total = nums[i] + nums[j];
        hash.set(total, [i, j]);
      }
    }
    return hash.get(target);
    */

    // 用一个循环 + hash表,
    const hash = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
      if (hash.has(target - nums[i])) {
        return [hash.get(target - nums[i], i)];
      }
      hash.set(nums[i], i);
    }

    return [];
  };

});
// 3.无重复字符的最长子串
(() => {
  // 给定一个字符串s,请你找出其中不含有重复字符的最长字串的长度
  /*
  示例 1:
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  示例 2:
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  示例 3:
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
   */

  /**
   * @param {string} s
   * @return {number}
   */
  var lengthOfLongestSubstring = function (s) {
    /* 过程
      abcabcbb
    1 a
    2 ab
    3 abc
    4  bca
    5   cab
    6    abc
    7      cb
    8        b
    */
    // 思路1
    // 双指针(left,right),如果右指针的值在 之间能找到,左指针移到重复位置+1
    // let left = 0;
    // let max = 0;
    // let map = new Map();
    // for (let right = 0; right < s.length; right++) { // 
    //   if (map.has(s[right]) && map.get(s[right]) >= left) {
    //     left = map.get[s[i]] + 1;
    //   }
    //   max = Math.max(res, i - left + 1);
    //   map.set(s[i], i);
    // }
    // return max;

    // 思路2
    let temp = '';
    let max = 0;
    for (let i = 0; i < s.length; i++) {
      let curr = s[i];
      let findIndex = temp.indexOf(curr);
      if (findIndex > -1) { }
      max = Math.max(temp.length, max);
      temp += curr;
    }

    return max;

  };
});
// 76.最小覆盖字串


// 树
// 图
// 堆