import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { BillingSubsService } from "../data/billing.service";
import { ToastService } from "libs/shared/toast/toast.service";
import { BillingPlanApi, BillingPlanCreate, BillingPlanRow } from "./billing.model";

@Injectable({ providedIn: "root" })
export class BillingSubsStore {
  constructor(
    private service: BillingSubsService,
    private toast: ToastService
  ) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly dialogMode = signal<"create" | "edit">("create");
  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly plans = signal<BillingPlanApi[]>([]);

  readonly planRows = computed(() =>
    this.plans().map((plan) => {
      const status = plan.is_active ? "Active" : "Inactive";
      const statusVariant = plan.is_active ? "success" : "danger";
      return { ...plan, status, statusVariant } satisfies BillingPlanRow;
    })
  );

  loadPlans() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getPlans()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (plans) => {
          this.plans.set(plans ?? []);
        },
        error: (e) => {
          this.plans.set([]);
          this.error.set(e?.message ?? "Failed to load plans");
        }
      });
  }

  addLocalPlan(plan: BillingPlanApi) {
    this.plans.set([...this.plans(), plan]);
  }

  createPlan(dto: BillingPlanCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createPlan(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (plan) => {
          this.plans.set([...this.plans(), plan]);
          this.toast.success("Success", "Plan created");
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          const msg = e?.message ?? "Failed to create plan";
          this.createError.set(msg);
          this.toast.error("Error", msg);
        }
      });
  }

  updatePlan(planId: string, dto: BillingPlanCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .updatePlan(planId, dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (plan) => {
          const updated = this.plans().map((item) => (item.id === plan.id ? plan : item));
          this.plans.set(updated);
          this.toast.success("Success", "Plan updated");
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          const msg = e?.message ?? "Failed to update plan";
          this.createError.set(msg);
          this.toast.error("Error", msg);
        }
      });
  }

  deletePlan(planId: string) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deletePlan(planId)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.plans.set(this.plans().filter((plan) => plan.id !== planId));
          this.toast.success("Success", "Plan deleted");
        },
        error: (e) => {
          const msg = e?.message ?? "Failed to delete plan";
          this.deleteError.set(msg);
          this.toast.error("Error", msg);
        }
      });
  }
}
