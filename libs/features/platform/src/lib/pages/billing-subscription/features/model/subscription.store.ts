import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { SubscriptionMockService } from "../data/subscription.mock.service";
import { SubscriptionApi, SubscriptionCreate, SubscriptionRow, SubscriptionUpdate } from "./subscription.model";

@Injectable({ providedIn: "root" })
export class SubscriptionStore {
  constructor(private service: SubscriptionMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly subscriptions = signal<SubscriptionApi[]>([]);

  readonly subscriberRows = computed(() =>
    this.subscriptions().map((subscription) => {
      const statusLower = (subscription.status ?? "").toLowerCase();
      const statusVariant = statusLower === "active" ? "success" : "secondary";
      return { ...subscription, statusVariant } satisfies SubscriptionRow;
    })
  );

  loadSubscriptions() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getSubscriptions()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (subscriptions) => {
          this.subscriptions.set(subscriptions ?? []);
        },
        error: (e) => {
          this.subscriptions.set([]);
          this.error.set(e?.message ?? "Failed to load subscriptions");
        }
      });
  }

  createSubscription(dto: SubscriptionCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createSubscription(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (subscription) => {
          this.subscriptions.set([...this.subscriptions(), subscription]);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create subscription");
        }
      });
  }

  updateSubscription(id: string, dto: SubscriptionUpdate) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateSubscription(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (subscription) => {
          const updated = this.subscriptions().map((item) =>
            item.id === subscription.id ? subscription : item
          );
          this.subscriptions.set(updated);
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update subscription");
        }
      });
  }

  deleteSubscription(id: string) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteSubscription(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.subscriptions.set(this.subscriptions().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete subscription");
        }
      });
  }
}
