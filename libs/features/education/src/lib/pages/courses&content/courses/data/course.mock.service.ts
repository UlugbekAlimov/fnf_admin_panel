import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { CourseApi, CourseCreate, CourseUpdate } from "../model/course.model";

@Injectable({ providedIn: "root" })
export class CourseMockService {
  private readonly latencyMs = 250;
  private data: CourseApi[] = [
    {
      id: 1,
      name: "UX UI Design Fundamentals",
      slug: "ux-ui-design-fundamentals",
      level: "Beginner",
      language: "English",
      students: 1200,
      status: "Published",
      createdAt: "2023-01-12",
      logo: "/favicon.ico",
      description: "Core UI/UX concepts, user flows, and layout fundamentals."
    }
  ];

  getCourses(): Observable<CourseApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createCourse(dto: CourseCreate): Observable<CourseApi> {
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: CourseApi = {
      id: nextId,
      createdAt: new Date().toISOString().slice(0, 10),
      students: dto.students ?? 0,
      logo: dto.logo ?? "/favicon.ico",
      ...dto
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateCourse(id: number, dto: CourseUpdate): Observable<CourseApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Course not found"));
    }

    const updated: CourseApi = {
      ...this.data[index],
      ...dto,
      students: typeof dto.students === "number" ? dto.students : this.data[index].students,
      logo: dto.logo ?? this.data[index].logo
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteCourse(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Course not found"));
    }
    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
