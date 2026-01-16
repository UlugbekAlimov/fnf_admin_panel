import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillingPlanApi, BillingPlanCreate } from '../model/billing.model';
import { environment } from '@fnf-admin/environment';

@Injectable({ providedIn: 'root' })
export class BillingSubsService {
  constructor(private http: HttpClient) {}

  private readonly base = environment.apiUrl.replace(/\/+$/, '');

  getPlans() {
    return this.http.get<BillingPlanApi[]>(`${this.base}/billing/plans`);
  }

  createPlan(dto: BillingPlanCreate) {
    return this.http.post<BillingPlanApi>(`${this.base}/billing/plans`, dto);
  }

  updatePlan(planId: string, dto: BillingPlanCreate) {
    return this.http.patch<BillingPlanApi>(`${this.base}/billing/plans/${planId}`, dto);
  }

  deletePlan(planId: string) {
    return this.http.delete<void>(`${this.base}/billing/plans/${planId}`);
  }
}
