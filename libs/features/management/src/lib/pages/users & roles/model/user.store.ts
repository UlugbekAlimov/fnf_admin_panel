import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { UserMockService } from "../data/user.mock.service";
import { UserApi, UserCreate, UserUpdate } from "./user.model";

@Injectable({ providedIn: "root" })
export class UserStore {
  constructor(private service: UserMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly users = signal<UserApi[]>([]);

  readonly rows = computed(() => this.users().map((user) => this.withMeta(user)));

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getUsers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (users) => {
          this.users.set(users ?? []);
        },
        error: (e) => {
          this.users.set([]);
          this.error.set(e?.message ?? "Failed to load users");
        }
      });
  }

  createUser(dto: UserCreate) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createUser(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (user) => {
          this.users.set([...this.users(), user]);
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create user");
        }
      });
  }

  updateUser(id: number, dto: UserUpdate) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateUser(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (user) => {
          const updated = this.users().map((item) => (item.id === user.id ? user : item));
          this.users.set(updated);
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update user");
        }
      });
  }

  deleteUser(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteUser(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.users.set(this.users().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete user");
        }
      });
  }

  private withMeta(user: UserApi): UserApi {
    const planMeta: Record<string, { variant: string; icon: string }> = {
      Enterprise: { variant: "success", icon: "pi pi-bolt" },
      Pro: { variant: "info", icon: "pi pi-box" },
      Starter: { variant: "warning", icon: "pi pi-star" }
    };
    const statusMeta: Record<string, { variant: string; icon: string }> = {
      Active: { variant: "success", icon: "pi pi-check" },
      Pending: { variant: "warning", icon: "pi pi-clock" },
      Inactive: { variant: "danger", icon: "pi pi-times" }
    };
    const plan = user.plan;
    const status = user.status;
    return {
      ...user,
      planVariant: planMeta[plan]?.variant ?? user.planVariant ?? "info",
      planIcon: planMeta[plan]?.icon ?? user.planIcon ?? "pi pi-box",
      statusVariant: statusMeta[status]?.variant ?? user.statusVariant ?? "info",
      statusIcon: statusMeta[status]?.icon ?? user.statusIcon ?? "pi pi-info-circle"
    };
  }
}
