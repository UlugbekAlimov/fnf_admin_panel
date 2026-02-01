export type SubscriptionApi = {
  id: string;
  company_id: string;
  plan_id: string;
  status: string;
  billing_cycle: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
};

export type SubscriptionCreate = Omit<SubscriptionApi, "id" | "created_at" | "updated_at">;

export type SubscriptionUpdate = Partial<SubscriptionCreate>;

export type SubscriptionRow = SubscriptionApi & {
  statusVariant: "success" | "secondary";
};
