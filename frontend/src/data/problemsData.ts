const problemsData: any = {

1: {
title: "Two Sum",
description:
"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
example:
`nums = [2,7,11,15]
target = 9
Output: [0,1]`,
constraints:[
"2 ≤ nums.length ≤ 10⁴",
"-10⁹ ≤ nums[i] ≤ 10⁹"
]
},

2:{
title:"Valid Parentheses",
description:
"Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
example:
`s = "()[]{}"
Output: true`,
constraints:[
"1 ≤ s.length ≤ 10⁴"
]
},

3:{
title:"Merge Two Sorted Lists",
description:
"Merge two sorted linked lists and return it as a sorted list.",
example:
`l1 = [1,2,4]
l2 = [1,3,4]
Output: [1,1,2,3,4,4]`,
constraints:[
"0 ≤ nodes ≤ 50"
]
},

4:{
title:"Binary Search",
description:
"Given a sorted array and a target value, return the index of the target.",
example:
`nums=[1,2,3,4,5]
target=4
Output:3`,
constraints:["log(n) time required"]
},

5:{
title:"Best Time to Buy and Sell Stock",
description:
"Find the maximum profit from buying and selling a stock.",
example:
`prices=[7,1,5,3,6,4]
Output:5`,
constraints:["1 ≤ prices.length ≤ 10⁵"]
},

6:{
title:"Longest Substring Without Repeating Characters",
description:
"Find the length of the longest substring without repeating characters.",
example:
`s="abcabcbb"
Output:3`,
constraints:["0 ≤ s.length ≤ 5 * 10⁴"]
},

7:{
title:"Add Two Numbers",
description:
"Add two numbers represented by linked lists.",
example:
`l1=[2,4,3]
l2=[5,6,4]
Output:[7,0,8]`,
constraints:["Nodes ≤ 100"]
},

8:{
title:"3Sum",
description:
"Find all unique triplets in the array which gives the sum of zero.",
example:
`nums=[-1,0,1,2,-1,-4]
Output:[[-1,-1,2],[-1,0,1]]`,
constraints:["3 ≤ nums.length ≤ 3000"]
},

9:{
title:"Group Anagrams",
description:
"Group words that are anagrams of each other.",
example:
`["eat","tea","tan","ate","nat","bat"]`,
constraints:["strings ≤ 10⁴"]
},

10:{
title:"Coin Change",
description:
"Find minimum coins required to make amount.",
example:
`coins=[1,2,5]
amount=11
Output:3`,
constraints:["0 ≤ amount ≤ 10⁴"]
},

11:{
title:"Number of Islands",
description:
"Count number of islands in a grid.",
example:
`grid=[[1,1,0],[0,1,0]]
Output:1`,
constraints:["grid ≤ 300x300"]
},

12:{
title:"Word Ladder",
description:
"Find shortest transformation sequence between words.",
example:
`hit → cog`,
constraints:["word length ≤ 10"]
},

13:{
title:"Median of Two Sorted Arrays",
description:
"Find the median of two sorted arrays.",
example:
`nums1=[1,3]
nums2=[2]
Output:2`,
constraints:["O(log(m+n))"]
},

14:{
title:"Merge k Sorted Lists",
description:
"Merge k sorted linked lists into one sorted list.",
example:
`k lists → merged list`,
constraints:["k ≤ 10⁴"]
},

15:{
title:"N-Queens",
description:
"Place N queens on an N×N chessboard so that no two queens attack each other.",
example:
`n=4`,
constraints:["1 ≤ n ≤ 9"]
}

};

export default problemsData;