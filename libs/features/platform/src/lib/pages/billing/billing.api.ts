import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BillingPlan, Subscription } from './billing.models';
import { environment } from '@fnf-admin/environment';

@Injectable({ providedIn: 'root' })
export class BillingApi {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/+$/, '') + '/billing';

  getPlans() {
    return this.http.get<BillingPlan[]>(`${this.baseUrl}/plans`);
  }

  getSubscriptions() {
    return this.http.get<Subscription[]>(`${this.baseUrl}/subscriptions`);
  }
}
