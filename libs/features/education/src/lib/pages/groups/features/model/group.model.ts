export type GroupApi = {
  id: number;
  name: string;
  slug: string;
  logo: string;
  city: string;
  plan: string;
  status: string;
  created_at: string;
};

export type GroupCreate = Omit<GroupApi, "id" | "created_at" | "logo"> & { logo?: string };

export type GroupUpdate = Partial<GroupCreate>;
