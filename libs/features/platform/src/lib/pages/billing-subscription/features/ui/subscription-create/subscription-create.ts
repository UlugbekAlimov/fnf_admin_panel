import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";

export type SubscriptionDraft = {
  company_id: string;
  plan_id: string;
  status: string;
  billing_cycle: string;
  current_period_start: string;
  current_period_end: string;
};

@Component({
  selector: "platform-subscription-create",
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, Dialog, InputTextModule],
  templateUrl: "./subscription-create.html"
})
export class SubscriptionCreateComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<SubscriptionDraft>();

  companyId = "";
  planId = "";
  status = "active";
  billingCycle = "monthly";
  currentPeriodStart = "";
  currentPeriodEnd = "";

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    const companyId = this.companyId.trim();
    const planId = this.planId.trim();
    if (!companyId || !planId) {
      return;
    }

    const draft: SubscriptionDraft = {
      company_id: companyId,
      plan_id: planId,
      status: this.status.trim() || "active",
      billing_cycle: this.billingCycle.trim() || "monthly",
      current_period_start: this.currentPeriodStart.trim(),
      current_period_end: this.currentPeriodEnd.trim()
    };

    this.create.emit(draft);
    this.reset();
    this.visibleChange.emit(false);
  }

  private reset() {
    this.companyId = "";
    this.planId = "";
    this.status = "active";
    this.billingCycle = "monthly";
    this.currentPeriodStart = "";
    this.currentPeriodEnd = "";
  }
}
