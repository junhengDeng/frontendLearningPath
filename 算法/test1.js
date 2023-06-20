/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *    this.val = (val === undefined ? 0 : val)
 *    this.next = (next === undefined ? null : next)
 * }
 */

var addTwoNumbers = function (l1, l2) {
  let head = null
  let tail = null
  let carry = 0

  while (l1 || l2 || carry) {
    const firstNum = l1?.val || 0
    const secondNum = l2?.val || 0
    const sum = firstNum + secondNum + carry
    carry = Math.floor(sum / 10)
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      tail = tail.next = new ListNode(sum % 10)
    }

    l1 = l1?.next
    l2 = l2?.next
  }

  return head
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var res = []

  var sl = [].slice.call(s)

  for (let i = 0; i < sl.length; i++) {
    let r = []
    for (let j = i; j < sl.length; j++) {
      if (r.includes(sl[j])) break
      r.push(sl[j])
    }
    res = res.length >= r.length ? res : r
  }
  return res.length
}


var lengthOfLongestSubstring = function (s) {
  var res = []
  var len = 0

  var sl = [].slice.call(s)
  console.log(sl, 'sl')

  for (let i = 0; i < sl.length; i++) {
    const val = sl[i]
    const fIndex = res.findIndex(j => j === val)
    if (fIndex > -1) {
      res.splice(0, fIndex + 1)
    }
    res.push(val)
    len = res.length > len ? res.length : len
    console.log(res, 'res')
  }
  return len
}

var lengthOfLongestSubstring = function (s) {
  var res = []
  var len = 0
  for (let i = 0; i < s.length; i++) {
    const index = res.findIndex(j => j === s[i])
    if (index > -1) { res.splice(0, index + 1) }
    res.push(s[i])
    len = Math.max(res.length, len)
  }
  return len
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const input = (nums1.concat(nums2)).sort((a, b) => a - b)
  // const index = res % 2;
  const yushu = input.length % 2
  const zhengshu = Math.floor(input.length / 2)
  const zhongweishu = []
  yushu ? zhongweishu.push(input[zhengshu]) : zhongweishu.push(input[zhengshu - 1], input[zhengshu])

  console.log(zhongweishu)

  return zhongweishu.reduce((t, i) => t + i, 0) / 2
}