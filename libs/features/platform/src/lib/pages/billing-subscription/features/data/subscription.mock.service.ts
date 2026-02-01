import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import {
  SubscriptionApi,
  SubscriptionCreate,
  SubscriptionUpdate,
} from '../model/subscription.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionMockService {
  private readonly latencyMs = 250;
  private data: SubscriptionApi[] = [
    {
      id: 'e60ea7e5-6a8f-4ad2-b1f6-2db6a2fca6a2',
      company_id: 'Brooklyn ',
      plan_id: 'Free',
      status: 'active',
      billing_cycle: 'monthly',
      current_period_start: '2026-01-15T15:14:06.585260Z',
      current_period_end: '2026-02-14T15:14:06.585260Z',
      created_at: '2026-01-15T15:14:06.585260Z',
      updated_at: '2026-01-15T15:14:06.585260Z',
    },
  ];

  getSubscriptions(): Observable<SubscriptionApi[]> {
    return of(this.data.map((item) => ({ ...item }))).pipe(delay(this.latencyMs));
  }

  createSubscription(dto: SubscriptionCreate): Observable<SubscriptionApi> {
    const now = new Date().toISOString();
    const item: SubscriptionApi = {
      id: this.newId(),
      ...dto,
      created_at: now,
      updated_at: now,
    };
    this.data = [...this.data, item];
    return of({ ...item }).pipe(delay(this.latencyMs));
  }

  updateSubscription(id: string, dto: SubscriptionUpdate): Observable<SubscriptionApi> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('Subscription not found'));
    }

    const updated: SubscriptionApi = {
      ...this.data[index],
      ...dto,
      updated_at: new Date().toISOString(),
    };
    this.data = [...this.data.slice(0, index), updated, ...this.data.slice(index + 1)];
    return of({ ...updated }).pipe(delay(this.latencyMs));
  }

  deleteSubscription(id: string): Observable<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('Subscription not found'));
    }

    this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)];
    return of(void 0).pipe(delay(this.latencyMs));
  }

  private newId() {
    return `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
