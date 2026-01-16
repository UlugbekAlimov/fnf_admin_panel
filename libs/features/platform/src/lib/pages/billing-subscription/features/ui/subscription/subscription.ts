import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { UiTableColumn, UiTableComponent } from "libs/shared/table/table";
import { SubscriptionCreateComponent, SubscriptionDraft } from "../subscription-create/subscription-create";

@Component({
  selector: "platform-subscription",
  standalone: true,
  imports: [ButtonModule, CardModule, UiTableComponent, SubscriptionCreateComponent],
  templateUrl: "./subscription.html"
})
export class Subscription {
  showCreateDialog = false;

  subscriberColumns: UiTableColumn[] = [
    { field: "company_id", header: "Company ID" },
    { field: "plan_id", header: "Plan ID" },
    { field: "status", header: "Status" },
    { field: "billing_cycle", header: "Billing cycle" },
    { field: "current_period_start", header: "Period start" },
    { field: "current_period_end", header: "Period end" }
  ];

  subscriberRows: Array<
    SubscriptionDraft & {
      statusVariant: "success" | "secondary";
    }
  > = [
    {
      company_id: "52494bab-b94e-48bb-af53-92b63b584aa6",
      plan_id: "6091ed9d-23a8-43ba-b190-41f0272d0725",
      status: "active",
      billing_cycle: "monthly",
      current_period_start: "2026-01-15T15:14:06.585260Z",
      current_period_end: "2026-02-14T15:14:06.585260Z",
      statusVariant: "success"
    }
  ];

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  addSubscriber(draft: SubscriptionDraft) {
    const statusLower = draft.status.toLowerCase();
    const statusVariant = statusLower === "active" ? "success" : "secondary";
    this.subscriberRows = [...this.subscriberRows, { ...draft, statusVariant }];
    this.showCreateDialog = false;
  }
}
