import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { GroupApi, GroupCreate, GroupUpdate } from "../model/group.model";

@Injectable({ providedIn: "root" })
export class GroupMockService {
  private readonly latencyMs = 250;
  private data: GroupApi[] = [
    {
      id: 1,
      name: "Northwind Logistics",
      slug: "northwind-logistics",
      logo: "https://picsum.photos/seed/northwind/64",
      city: "English",
      plan: "120",
      status: "Active",
      created_at: "12.01.2025"
    }
  ];

  getGroups(): Observable<GroupApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createGroup(dto: GroupCreate): Observable<GroupApi> {
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: GroupApi = {
      id: nextId,
      created_at: new Date().toISOString().slice(0, 10),
      logo: dto.logo ?? "https://picsum.photos/seed/group/64",
      ...dto
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateGroup(id: number, dto: GroupUpdate): Observable<GroupApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Group not found"));
    }

    const updated: GroupApi = {
      ...this.data[index],
      ...dto,
      logo: dto.logo ?? this.data[index].logo
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteGroup(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("Group not found"));
    }
    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
