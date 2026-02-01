import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { GroupMockService } from "../data/group.mock.service";
import { GroupApi, GroupCreate, GroupUpdate } from "./group.model";

@Injectable({ providedIn: "root" })
export class GroupStore {
  constructor(private service: GroupMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly groups = signal<GroupApi[]>([]);

  readonly rows = computed(() =>
    this.groups().map((group) => {
      const statusLower = (group.status ?? "").toLowerCase();
      const statusVariant =
        statusLower === "active"
          ? "success"
          : statusLower === "pending"
            ? "warning"
            : statusLower === "blocked"
              ? "danger"
              : "secondary";
      return { ...group, statusVariant };
    })
  );

  loadGroups() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getGroups()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (groups) => {
          this.groups.set(groups ?? []);
        },
        error: (e) => {
          this.groups.set([]);
          this.error.set(e?.message ?? "Failed to load groups");
        }
      });
  }

  createGroup(dto: GroupCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createGroup(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (group) => {
          this.groups.set([...this.groups(), group]);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create group");
        }
      });
  }

  updateGroup(id: number, dto: GroupUpdate, opts?: { closeOnSuccess?: () => void }) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateGroup(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (group) => {
          const updated = this.groups().map((item) => (item.id === group.id ? group : item));
          this.groups.set(updated);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update group");
        }
      });
  }

  deleteGroup(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteGroup(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.groups.set(this.groups().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete group");
        }
      });
  }
}
