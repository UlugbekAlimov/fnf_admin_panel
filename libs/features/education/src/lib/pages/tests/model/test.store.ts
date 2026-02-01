import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { TestMockService } from "../data/test.mock.service";
import { TestApi, TestCreate, TestUpdate } from "./test.model";

@Injectable({ providedIn: "root" })
export class TestStore {
  constructor(private service: TestMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly tests = signal<TestApi[]>([]);

  readonly rows = computed(() =>
    this.tests().map((test) => {
      const statusLower = (test.status ?? "").toLowerCase();
      const statusVariant =
        statusLower === "active"
          ? "success"
          : statusLower === "draft"
            ? "warning"
            : statusLower === "archived"
              ? "secondary"
              : "secondary";
      return { ...test, statusVariant };
    })
  );

  loadTests() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getTests()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (tests) => {
          this.tests.set(tests ?? []);
        },
        error: (e) => {
          this.tests.set([]);
          this.error.set(e?.message ?? "Failed to load tests");
        }
      });
  }

  createTest(dto: TestCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createTest(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (test) => {
          this.tests.set([...this.tests(), test]);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create test");
        }
      });
  }

  updateTest(id: number, dto: TestUpdate, opts?: { closeOnSuccess?: () => void }) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateTest(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (test) => {
          const updated = this.tests().map((item) => (item.id === test.id ? test : item));
          this.tests.set(updated);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update test");
        }
      });
  }

  deleteTest(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteTest(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.tests.set(this.tests().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete test");
        }
      });
  }
}
