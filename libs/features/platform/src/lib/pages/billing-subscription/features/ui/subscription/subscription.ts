import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Dialog } from "primeng/dialog";
import { UiTableColumn, UiTableComponent } from "libs/shared/table/table";
import { SubscriptionCreateComponent, SubscriptionDraft } from "../subscription-create/subscription-create";
import { SubscriptionStore } from "../../model/subscription.store";

@Component({
  selector: "platform-subscription",
  standalone: true,
  imports: [ButtonModule, CardModule, Dialog, UiTableComponent, SubscriptionCreateComponent],
  templateUrl: "./subscription.html"
})
export class Subscription {
  showCreateDialog = false;
  showDeleteDialog = false;
  deletingSubscriptionId: string | null = null;
  deletingCompanyId = "";
  editingSubscription: (SubscriptionDraft & { id: string }) | null = null;

  subscriberColumns: UiTableColumn[] = [
    { field: "company_id", header: "Company" },
    { field: "plan_id", header: "Plan" },
    { field: "status", header: "Status" },
    { field: "billing_cycle", header: "Billing cycle" },
    { field: "current_period_start", header: "Period start" },
    { field: "current_period_end", header: "Period end" }
  ];

  get subscriberRows() {
    return this.store.subscriberRows();
  }

  openCreateDialog() {
    this.editingSubscription = null;
    this.showCreateDialog = true;
  }

  addSubscriber(draft: SubscriptionDraft) {
    this.store.createSubscription(draft, {
      closeOnSuccess: () => {
        this.showCreateDialog = false;
      }
    });
  }

  updateSubscriber(payload: { id: string; data: SubscriptionDraft }) {
    this.store.updateSubscription(payload.id, payload.data);
  }

  openEditSubscriber(row: SubscriptionDraft & { id: string }) {
    this.editingSubscription = {
      id: row.id,
      company_id: row.company_id,
      plan_id: row.plan_id,
      status: row.status,
      billing_cycle: row.billing_cycle,
      current_period_start: row.current_period_start,
      current_period_end: row.current_period_end
    };
    this.showCreateDialog = true;
  }

  openDeleteSubscriber(row: { id: string; company_id?: string }) {
    this.deletingSubscriptionId = row.id;
    this.deletingCompanyId = row.company_id ?? "";
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.deletingSubscriptionId = null;
    this.deletingCompanyId = "";
  }

  deleteSubscriber() {
    if (!this.deletingSubscriptionId) {
      return;
    }
    this.store.deleteSubscription(this.deletingSubscriptionId);
    this.closeDeleteDialog();
  }

  constructor(public store: SubscriptionStore) {
    this.store.loadSubscriptions();
  }
}
