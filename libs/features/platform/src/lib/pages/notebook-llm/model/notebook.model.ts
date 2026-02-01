export type NotebookApi = {
  id: number;
  name: string;
  owner: string;
  lastEdited: string;
  tokens: number;
  status: string;
  visibility: "Private" | "Shared";
  created_at: string;
  updated_at: string;
};

export type NotebookCreate = Omit<NotebookApi, "id" | "created_at" | "updated_at">;

export type NotebookUpdate = Partial<NotebookCreate>;

export type NotebookRow = NotebookApi & {
  statusVariant: "success" | "warning" | "danger";
};
