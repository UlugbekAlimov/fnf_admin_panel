import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { QuestionMockService } from "../data/question.mock.service";
import { QuestionApi, QuestionCreate, QuestionUpdate } from "./question.model";

@Injectable({ providedIn: "root" })
export class QuestionStore {
  constructor(private service: QuestionMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly questions = signal<QuestionApi[]>([]);

  readonly rows = computed(() =>
    this.questions().map((question) => {
      const statusLower = (question.status ?? "").toLowerCase();
      const statusVariant =
        statusLower === "active"
          ? "success"
          : statusLower === "draft"
            ? "warning"
            : statusLower === "archived"
              ? "secondary"
              : "secondary";
      return { ...question, statusVariant };
    })
  );

  loadQuestions() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getQuestions()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (questions) => {
          this.questions.set(questions ?? []);
        },
        error: (e) => {
          this.questions.set([]);
          this.error.set(e?.message ?? "Failed to load questions");
        }
      });
  }

  createQuestion(dto: QuestionCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createQuestion(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (question) => {
          this.questions.set([...this.questions(), question]);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create question");
        }
      });
  }

  updateQuestion(id: number, dto: QuestionUpdate, opts?: { closeOnSuccess?: () => void }) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateQuestion(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (question) => {
          const updated = this.questions().map((item) => (item.id === question.id ? question : item));
          this.questions.set(updated);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update question");
        }
      });
  }

  deleteQuestion(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteQuestion(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.questions.set(this.questions().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete question");
        }
      });
  }
}
