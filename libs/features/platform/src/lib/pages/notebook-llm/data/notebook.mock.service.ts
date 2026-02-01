import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { NotebookApi, NotebookCreate, NotebookUpdate } from "../model/notebook.model";

@Injectable({ providedIn: "root" })
export class NotebookMockService {
  private readonly latencyMs = 250;
  private data: NotebookApi[] = [
    {
      id: 1,
      name: "Admissions Assistant",
      owner: "A. Rivera",
      lastEdited: "2026-01-17",
      tokens: 12800,
      status: "Active",
      visibility: "Shared",
      created_at: "2026-01-01T09:00:00.000Z",
      updated_at: "2026-01-17T10:20:00.000Z"
    },
    {
      id: 2,
      name: "Course Planner",
      owner: "M. Lee",
      lastEdited: "2026-01-13",
      tokens: 6200,
      status: "Draft",
      visibility: "Private",
      created_at: "2026-01-05T11:30:00.000Z",
      updated_at: "2026-01-13T08:40:00.000Z"
    },
    {
      id: 3,
      name: "Support Knowledge Base",
      owner: "Team",
      lastEdited: "2026-01-09",
      tokens: 9100,
      status: "Archived",
      visibility: "Shared",
      created_at: "2025-12-22T14:10:00.000Z",
      updated_at: "2026-01-09T12:05:00.000Z"
    }
  ];

  getNotebooks(): Observable<NotebookApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createNotebook(dto: NotebookCreate): Observable<NotebookApi> {
    const now = new Date().toISOString();
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: NotebookApi = {
      id: nextId,
      ...dto,
      created_at: now,
      updated_at: now
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateNotebook(id: number, dto: NotebookUpdate): Observable<NotebookApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Notebook not found"));
    }

    const updated: NotebookApi = {
      ...this.data[index],
      ...dto,
      updated_at: new Date().toISOString()
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteNotebook(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Notebook not found"));
    }

    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
