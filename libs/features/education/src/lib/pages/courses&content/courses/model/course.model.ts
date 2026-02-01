export type CourseApi = {
  id: number;
  name: string;
  slug: string;
  level: string;
  language: string;
  students: number;
  status: string;
  createdAt: string;
  logo: string;
  description: string;
};

export type CourseCreate = Omit<CourseApi, "id" | "createdAt" | "students" | "logo"> & {
  students?: number;
  logo?: string;
};

export type CourseUpdate = Partial<CourseCreate>;
