import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";

export type BillingPlanDraft = {
  name: string;
  max_users: number;
  max_storage_mb: number;
  max_courses: number;
  ai_requests_per_month: number;
  price_monthly: number;
  price_yearly: number;
  is_active: boolean;
};

@Component({
  selector: "platform-billing-create",
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, Dialog, InputTextModule],
  templateUrl: "./billing-create.html"
})
export class BillingCreateComponent implements OnChanges {
  @Input() visible = false;
  @Input() editingPlan: (BillingPlanDraft & { id: string }) | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<BillingPlanDraft>();
  @Output() update = new EventEmitter<{ id: string; data: BillingPlanDraft }>();

  name = "";
  maxUsers: number | null = null;
  maxStorageMb: number | null = null;
  maxCourses: number | null = null;
  aiRequests: number | null = null;
  priceMonthly: number | null = null;
  priceYearly: number | null = null;
  isActive = true;

  get isEditMode(): boolean {
    return !!this.editingPlan;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["editingPlan"]) {
      if (this.editingPlan) {
        this.name = this.editingPlan.name ?? "";
        this.maxUsers = this.editingPlan.max_users ?? null;
        this.maxStorageMb = this.editingPlan.max_storage_mb ?? null;
        this.maxCourses = this.editingPlan.max_courses ?? null;
        this.aiRequests = this.editingPlan.ai_requests_per_month ?? null;
        this.priceMonthly = this.editingPlan.price_monthly ?? null;
        this.priceYearly = this.editingPlan.price_yearly ?? null;
        this.isActive = !!this.editingPlan.is_active;
      } else {
        this.reset();
      }
    }
  }

  close() {
    this.reset();
    this.visibleChange.emit(false);
  }

  handleVisibleChange(value: boolean) {
    if (!value) {
      this.reset();
      this.visibleChange.emit(false);
    }
  }

  submit() {
    const name = this.name.trim();
    if (!name) {
      return;
    }

    const plan: BillingPlanDraft = {
      name,
      max_users: this.toNumber(this.maxUsers),
      max_storage_mb: this.toNumber(this.maxStorageMb),
      max_courses: this.toNumber(this.maxCourses),
      ai_requests_per_month: this.toNumber(this.aiRequests),
      price_monthly: this.toNumber(this.priceMonthly),
      price_yearly: this.toNumber(this.priceYearly),
      is_active: this.isActive
    };

    if (this.editingPlan) {
      this.update.emit({ id: this.editingPlan.id, data: plan });
    } else {
      this.create.emit(plan);
    }
    this.reset();
    this.visibleChange.emit(false);
  }

  private reset() {
    this.name = "";
    this.maxUsers = null;
    this.maxStorageMb = null;
    this.maxCourses = null;
    this.aiRequests = null;
    this.priceMonthly = null;
    this.priceYearly = null;
    this.isActive = true;
  }

  private toNumber(value: number | null): number {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }
    return 0;
  }
}
