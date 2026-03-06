export interface Student {
  id: string;
  name: string;
  avatar: string;
  class: string;
  grade: string;
  gpa: number;
  studentId: string;
}

export interface Homework {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  subject: string;
  date: string;
  score: number;
  totalScore: number;
  status: 'graded' | 'grading' | 'pending' | 'approved' | 'rejected';
  questions: QuestionFeedback[];
  mastery: {
    label: string;
    value: number;
  }[];
  aiSuggestion: string;
  learningResources: {
    title: string;
    type: 'video' | 'exercise';
    link: string;
  }[];
  imageUrl?: string;
  folderName?: string;
}

export interface QuestionFeedback {
  id: number;
  title: string;
  score: number;
  maxScore: number;
  feedback: string;
  aiTip?: string;
  isCorrect: boolean;
  correctAnswer?: string;
}

export interface ClassStats {
  averageScore: number;
  participation: number;
  atRiskCount: number;
  topGradeCount: number;
}
