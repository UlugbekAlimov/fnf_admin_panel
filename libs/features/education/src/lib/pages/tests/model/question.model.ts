export type QuestionApi = {
  id: number;
  testName: string;
  text: string;
  type: string;
  answers: number;
  status: string;
  createdAt: string;
};

export type QuestionCreate = Omit<QuestionApi, "id" | "createdAt">;

export type QuestionUpdate = Partial<QuestionCreate>;
