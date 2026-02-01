export type UserApi = {
  id: number;
  company: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  plan: string;
  status: string;
  users: number;
  created_at: string;
  photo: string;
  planVariant: string;
  planIcon: string;
  statusVariant: string;
  statusIcon: string;
};

export type UserCreate = Omit<
  UserApi,
  | "id"
  | "created_at"
  | "lastActive"
  | "photo"
  | "planVariant"
  | "planIcon"
  | "statusVariant"
  | "statusIcon"
>;

export type UserUpdate = Partial<UserCreate>;
