import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { NotebookMockService } from "../data/notebook.mock.service";
import { NotebookApi, NotebookCreate, NotebookRow, NotebookUpdate } from "./notebook.model";

@Injectable({ providedIn: "root" })
export class NotebookStore {
  constructor(private service: NotebookMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly notebooks = signal<NotebookApi[]>([]);

  readonly rows = computed(() =>
    this.notebooks().map((notebook) => {
      const statusLower = (notebook.status ?? "").toLowerCase();
      const statusVariant =
        statusLower === "active" ? "success" : statusLower === "draft" ? "warning" : "danger";
      return { ...notebook, statusVariant } satisfies NotebookRow;
    })
  );

  loadNotebooks() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getNotebooks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (notebooks) => {
          this.notebooks.set(notebooks ?? []);
        },
        error: (e) => {
          this.notebooks.set([]);
          this.error.set(e?.message ?? "Failed to load notebooks");
        }
      });
  }

  createNotebook(dto: NotebookCreate) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createNotebook(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (notebook) => {
          this.notebooks.set([...this.notebooks(), notebook]);
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create notebook");
        }
      });
  }

  updateNotebook(id: number, dto: NotebookUpdate) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateNotebook(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (notebook) => {
          const updated = this.notebooks().map((item) =>
            item.id === notebook.id ? notebook : item
          );
          this.notebooks.set(updated);
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update notebook");
        }
      });
  }

  deleteNotebook(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteNotebook(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.notebooks.set(this.notebooks().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete notebook");
        }
      });
  }
}
