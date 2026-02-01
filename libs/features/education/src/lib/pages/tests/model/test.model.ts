export type TestApi = {
  id: number;
  name: string;
  course: string;
  questions: number;
  duration: string;
  status: string;
  createdAt: string;
};

export type TestCreate = Omit<TestApi, "id" | "createdAt">;

export type TestUpdate = Partial<TestCreate>;
