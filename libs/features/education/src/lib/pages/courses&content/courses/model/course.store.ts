import { Injectable, computed, signal } from "@angular/core";
import { finalize } from "rxjs";
import { CourseMockService } from "../data/course.mock.service";
import { CourseApi, CourseCreate, CourseUpdate } from "./course.model";

@Injectable({ providedIn: "root" })
export class CourseStore {
  constructor(private service: CourseMockService) {}

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  readonly updating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  private readonly courses = signal<CourseApi[]>([]);

  readonly rows = computed(() =>
    this.courses().map((course) => {
      const statusLower = (course.status ?? "").toLowerCase();
      const statusVariant =
        statusLower === "published" ? "success" : statusLower === "draft" ? "warning" : "secondary";
      return { ...course, statusVariant };
    })
  );

  loadCourses() {
    this.loading.set(true);
    this.error.set(null);

    this.service
      .getCourses()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (courses) => {
          this.courses.set(courses ?? []);
        },
        error: (e) => {
          this.courses.set([]);
          this.error.set(e?.message ?? "Failed to load courses");
        }
      });
  }

  createCourse(dto: CourseCreate, opts?: { closeOnSuccess?: () => void }) {
    this.creating.set(true);
    this.createError.set(null);

    this.service
      .createCourse(dto)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (course) => {
          this.courses.set([...this.courses(), course]);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.createError.set(e?.message ?? "Failed to create course");
        }
      });
  }

  updateCourse(id: number, dto: CourseUpdate, opts?: { closeOnSuccess?: () => void }) {
    this.updating.set(true);
    this.updateError.set(null);

    this.service
      .updateCourse(id, dto)
      .pipe(finalize(() => this.updating.set(false)))
      .subscribe({
        next: (course) => {
          const updated = this.courses().map((item) => (item.id === course.id ? course : item));
          this.courses.set(updated);
          opts?.closeOnSuccess?.();
        },
        error: (e) => {
          this.updateError.set(e?.message ?? "Failed to update course");
        }
      });
  }

  deleteCourse(id: number) {
    this.deleting.set(true);
    this.deleteError.set(null);

    this.service
      .deleteCourse(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.courses.set(this.courses().filter((item) => item.id !== id));
        },
        error: (e) => {
          this.deleteError.set(e?.message ?? "Failed to delete course");
        }
      });
  }
}
