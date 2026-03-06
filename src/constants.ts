import { Student, Homework } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: '张小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    class: '10-B 班',
    grade: 'A 等',
    gpa: 3.8,
    studentId: '20240582'
  },
  {
    id: '2',
    name: '李子明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    class: '八年级 (2) 班',
    grade: 'B+',
    gpa: 3.5,
    studentId: '20240123'
  }
];

export const MOCK_HOMEWORKS: Homework[] = [
  {
    id: 'hw1',
    title: 'Math Quiz #4: Calculus Basics',
    studentId: '1',
    studentName: '张同学',
    subject: '数学',
    date: '2023年10月24日',
    score: 92,
    totalScore: 100,
    status: 'graded',
    questions: [
      {
        id: 1,
        title: '题目 1',
        score: 10,
        maxScore: 10,
        feedback: '步骤正确。学生表现出对基础方程求解的清晰理解。',
        isCorrect: true
      },
      {
        id: 2,
        title: '题目 2',
        score: 6,
        maxScore: 10,
        feedback: '给予部分分数。正确应用了幂法则处理第一项，但忽略了第二项。',
        aiTip: '别忘了常数倍数的导数：d/dx[cx] = c。',
        isCorrect: false
      },
      {
        id: 3,
        title: '题目 3',
        score: 10,
        maxScore: 10,
        feedback: '非常出色。包含积分常数 (C)。',
        isCorrect: true
      }
    ],
    mastery: [
      { label: '代数基础', value: 100 },
      { label: '微分', value: 75 },
      { label: '积分', value: 95 }
    ],
    aiSuggestion: '张同学在代数和积分方面表现出色。主要的提升空间是在多项式中一致应用幂法则。',
    learningResources: [
      { title: '幂法则掌握教学视频', type: 'video', link: '#' },
      { title: '微分练习题集 2', type: 'exercise', link: '#' }
    ]
  }
];
