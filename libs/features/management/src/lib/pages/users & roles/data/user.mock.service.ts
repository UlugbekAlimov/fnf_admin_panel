import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { UserApi, UserCreate, UserUpdate } from "../model/user.model";

@Injectable({ providedIn: "root" })
export class UserMockService {
  private readonly latencyMs = 250;
  private data: UserApi[] = [
    {
      id: 1,
      company: "Acme Corp",
      name: "Rachel Green",
      email: "rachel@acme.com",
      role: "Manager",
      lastActive: "Today, 10:24",
      plan: "Enterprise",
      status: "Active",
      users: 120,
      created_at: "2023-01-01",
      photo: "/favicon.ico",
      planVariant: "success",
      planIcon: "pi pi-bolt",
      statusVariant: "success",
      statusIcon: "pi pi-check"
    },
    {
      id: 2,
      company: "Globex",
      name: "David Miller",
      email: "david@globex.com",
      role: "Owner",
      lastActive: "Yesterday, 18:02",
      plan: "Pro",
      status: "Pending",
      users: 48,
      created_at: "2023-02-10",
      photo: "/favicon.ico",
      planVariant: "info",
      planIcon: "pi pi-box",
      statusVariant: "warning",
      statusIcon: "pi pi-clock"
    },
    {
      id: 3,
      company: "Initech",
      name: "Lena Watts",
      email: "lena@initech.com",
      role: "Viewer",
      lastActive: "Dec 21, 09:10",
      plan: "Starter",
      status: "Inactive",
      users: 8,
      created_at: "2023-03-05",
      photo: "/favicon.ico",
      planVariant: "warning",
      planIcon: "pi pi-star",
      statusVariant: "danger",
      statusIcon: "pi pi-times"
    }
  ];

  getUsers(): Observable<UserApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createUser(dto: UserCreate): Observable<UserApi> {
    const nextId = this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
    const item: UserApi = {
      id: nextId,
      created_at: new Date().toISOString().slice(0, 10),
      lastActive: "Just now",
      photo: "/favicon.ico",
      planVariant: "",
      planIcon: "",
      statusVariant: "",
      statusIcon: "",
      ...dto
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateUser(id: number, dto: UserUpdate): Observable<UserApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("User not found"));
    }

    const updated: UserApi = {
      ...this.data[index],
      ...dto
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteUser(id: number): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error("User not found"));
    }
    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }
}
