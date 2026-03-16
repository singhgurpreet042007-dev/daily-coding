import { Controller, Get } from '@nestjs/common';

@Controller('api/problems')
export class ProblemsController {
  @Get()
  getProblems() {
    return [
      { id: 'p1', title: 'Two Sum', difficulty: 'Easy' },
      { id: 'p2', title: 'Valid Parentheses', difficulty: 'Easy' },
      { id: 'p3', title: 'Merge Two Sorted Lists', difficulty: 'Easy' },
      { id: 'p4', title: 'Best Time to Buy & Sell Stock', difficulty: 'Easy' },
      { id: 'p5', title: 'Contains Duplicate', difficulty: 'Easy' },

      { id: 'p6', title: 'Top K Frequent Elements', difficulty: 'Medium' },
      { id: 'p7', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
      { id: 'p8', title: '3Sum', difficulty: 'Medium' },
      { id: 'p9', title: 'Product of Array Except Self', difficulty: 'Medium' },
      { id: 'p10', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },

      { id: 'p11', title: 'Median of Two Sorted Arrays', difficulty: 'Hard' },
      { id: 'p12', title: 'Merge K Sorted Lists', difficulty: 'Hard' },
      { id: 'p13', title: 'Trapping Rain Water', difficulty: 'Hard' },
      { id: 'p14', title: 'Largest Rectangle in Histogram', difficulty: 'Hard' },
      { id: 'p15', title: 'Word Ladder', difficulty: 'Hard' },
    ];
  }
}