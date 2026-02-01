import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { QuestionApi, QuestionCreate, QuestionUpdate } from "../model/question.model";

@Injectable({ providedIn: "root" })
export class QuestionMockService {
  private readonly latencyMs = 250;
  private data: QuestionApi[] = [
    {
      id: 1,
      testName: "Midterm Assessment",
      text: "What is the primary function of mitochondria?",
      type: "Single choice",
      answers: 4,
      status: "Active",
      createdAt: "2026-01-11"
    },
    {
      id: 2,
      testName: "HTML Basics Quiz",
      text: "Which tag is used for an unordered list?",
      type: "Single choice",
      answers: 4,
      status: "Draft",
      createdAt: "2026-01-06"
    }
  ];

  getQuestions(): Observable<QuestionApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createQuestion(dto: QuestionCreate): Observable<QuestionApi> {
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: QuestionApi = {
      id: nextId,
      createdAt: new Date().toISOString().slice(0, 10),
      ...dto
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateQuestion(id: number, dto: QuestionUpdate): Observable<QuestionApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Question not found"));
    }

    const updated: QuestionApi = {
      ...this.data[index],
      ...dto
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteQuestion(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Question not found"));
    }
    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
