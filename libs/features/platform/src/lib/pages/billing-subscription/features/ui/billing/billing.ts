import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Dialog } from "primeng/dialog";
import { UiTableColumn, UiTableComponent } from "libs/shared/table/table";
import { BillingCreateComponent, BillingPlanDraft } from "../billing-create/billing-create";
import { BillingSubsStore } from "../../model/billing.store";
import { BillingPlanCreate } from "../../model/billing.model";

@Component({
  selector: "platform-billing",
  standalone: true,
  imports: [ButtonModule, CardModule, Dialog, UiTableComponent, BillingCreateComponent],
  templateUrl: "./billing.html"
})
export class BillingComponent {
  showCreatePlanDialog = false;
  showDeleteDialog = false;
  deletingPlanId: string | null = null;
  deletingPlanName = "";
  editingPlan: (BillingPlanDraft & { id: string }) | null = null;
  selectedPlans: Array<BillingPlanDraft & { status: string; statusVariant: string }> = [];

  get planRows() {
    return this.store.planRows();
  }

  planColumns: UiTableColumn[] = [
    { field: "name", header: "Plan" },
    { field: "max_users", header: "Max users" },
    { field: "max_storage_mb", header: "Storage (MB)" },
    { field: "max_courses", header: "Max courses" },
    { field: "ai_requests_per_month", header: "AI requests / month" },
    { field: "price_monthly", header: "Monthly ($)" },
    { field: "price_yearly", header: "Yearly ($)" },
    { field: "status", header: "Status" }
  ];

  openCreatePlanDialog() {
    this.editingPlan = null;
    this.showCreatePlanDialog = true;
  }

  openEditPlan(row: BillingPlanDraft & { id: string }) {
    this.editingPlan = {
      id: row.id,
      name: row.name,
      max_users: row.max_users,
      max_storage_mb: row.max_storage_mb,
      max_courses: row.max_courses,
      ai_requests_per_month: row.ai_requests_per_month,
      price_monthly: row.price_monthly,
      price_yearly: row.price_yearly,
      is_active: row.is_active
    };
    this.showCreatePlanDialog = true;
  }

  openDeletePlan(row: BillingPlanDraft & { id: string }) {
    this.deletingPlanId = row.id;
    this.deletingPlanName = row.name ?? "";
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.deletingPlanId = null;
    this.deletingPlanName = "";
  }

  refreshPlans() {
    this.store.loadPlans();
  }

  addPlan(plan: BillingPlanDraft) {
    const draft: BillingPlanCreate = {
      name: plan.name,
      max_users: plan.max_users,
      max_storage_mb: plan.max_storage_mb,
      max_courses: plan.max_courses,
      ai_requests_per_month: plan.ai_requests_per_month,
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly,
      is_active: plan.is_active
    };
    this.store.createPlan(draft, { closeOnSuccess: () => (this.showCreatePlanDialog = false) });
  }

  updatePlan(payload: { id: string; data: BillingPlanDraft }) {
    const draft: BillingPlanCreate = {
      name: payload.data.name,
      max_users: payload.data.max_users,
      max_storage_mb: payload.data.max_storage_mb,
      max_courses: payload.data.max_courses,
      ai_requests_per_month: payload.data.ai_requests_per_month,
      price_monthly: payload.data.price_monthly,
      price_yearly: payload.data.price_yearly,
      is_active: payload.data.is_active
    };
    this.store.updatePlan(payload.id, draft, {
      closeOnSuccess: () => {
        this.showCreatePlanDialog = false;
        this.editingPlan = null;
      }
    });
  }

  deletePlan() {
    if (!this.deletingPlanId) {
      return;
    }
    this.store.deletePlan(this.deletingPlanId);
    this.closeDeleteDialog();
  }

  constructor(public store: BillingSubsStore) {
    this.store.loadPlans();
  }
}
