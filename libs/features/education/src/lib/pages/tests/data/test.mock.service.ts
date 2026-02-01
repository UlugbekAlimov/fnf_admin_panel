import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { TestApi, TestCreate, TestUpdate } from "../model/test.model";

@Injectable({ providedIn: "root" })
export class TestMockService {
  private readonly latencyMs = 250;
  private data: TestApi[] = [
    {
      id: 1,
      name: "Midterm Assessment",
      course: "UX UI Design Fundamentals",
      questions: 25,
      duration: "45 min",
      status: "Active",
      createdAt: "2026-01-10"
    },
    {
      id: 2,
      name: "HTML Basics Quiz",
      course: "Frontend Essentials",
      questions: 15,
      duration: "20 min",
      status: "Draft",
      createdAt: "2026-01-05"
    }
  ];

  getTests(): Observable<TestApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createTest(dto: TestCreate): Observable<TestApi> {
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: TestApi = {
      id: nextId,
      createdAt: new Date().toISOString().slice(0, 10),
      ...dto
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateTest(id: number, dto: TestUpdate): Observable<TestApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Test not found"));
    }

    const updated: TestApi = {
      ...this.data[index],
      ...dto
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteTest(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Test not found"));
    }
    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
