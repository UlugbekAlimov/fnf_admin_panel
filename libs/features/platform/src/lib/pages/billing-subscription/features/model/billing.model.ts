export type BillingPlanApi = {
  id: string;
  name: string;
  max_users: number;
  max_storage_mb: number;
  max_courses: number;
  ai_requests_per_month: number;
  price_monthly: number;
  price_yearly: number;
  is_active: boolean;
};

export type BillingPlanRow = BillingPlanApi & {
  status: "Active" | "Inactive";
  statusVariant: "success" | "danger";
};

export type BillingPlanCreate = Omit<BillingPlanApi, "id">;
