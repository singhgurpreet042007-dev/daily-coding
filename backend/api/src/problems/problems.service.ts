import { Injectable } from '@nestjs/common';

export type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

@Injectable()
export class ProblemsService {
  private problems: Problem[] = [
    { id: '1', title: 'Sum of Two Numbers', difficulty: 'Easy' },
    { id: '2', title: 'Palindrome Check', difficulty: 'Easy' },
    { id: '3', title: 'Prime Number', difficulty: 'Easy' },
    { id: '4', title: 'Binary Search', difficulty: 'Medium' },
    { id: '5', title: 'Two Sum Variant', difficulty: 'Medium' },
  ];

  findAll() {
    return this.problems;
  }
}
