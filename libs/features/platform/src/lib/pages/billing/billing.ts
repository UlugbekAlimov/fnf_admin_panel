import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

/* =========================
   TYPES
========================= */

type UsageKey = 'courses' | 'lessons' | 'video_minutes' | 'materials';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
}

interface UsageMetric {
  key: UsageKey;
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

interface BillingPlan {
  name: string;
  basePrice: number;
  limits: Record<UsageKey, number>;
  overagePrice: Record<UsageKey, number>;
}

/* =========================
   COMPONENT
========================= */

@Component({
  selector: 'billing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css'],
})
export class Billing {

  /* =========================
     PLAN (STATIC / FROM API)
  ========================= */

  readonly plan = signal<BillingPlan>({
    name: 'Enterprise',
    basePrice: 299,
    limits: {
      courses: 50,
      lessons: 500,
      video_minutes: 15000,
      materials: 2000,
    },
    overagePrice: {
      courses: 5,
      lessons: 1,
      video_minutes: 0.01,
      materials: 0.5,
    },
  });

  /* =========================
     USAGE (FROM LMS DB)
  ========================= */

  readonly usage = signal<UsageMetric[]>([
    {
      key: 'courses',
      label: 'Courses',
      used: 42,
      limit: 50,
    },
    {
      key: 'lessons',
      label: 'Lessons',
      used: 320,
      limit: 500,
    },
    {
      key: 'video_minutes',
      label: 'Video Minutes',
      used: 12400,
      limit: 15000,
      unit: 'min',
    },
    {
      key: 'materials',
      label: 'Materials',
      used: 1120,
      limit: 2000,
    },
  ]);

  /* =========================
     INVOICES
  ========================= */

  readonly invoices = signal<Invoice[]>([
    {
      id: 'INV-2023-012',
      date: 'Oct 01, 2023',
      amount: 299,
      plan: 'Enterprise Monthly',
      status: 'paid',
    },
    {
      id: 'INV-2023-011',
      date: 'Sep 01, 2023',
      amount: 299,
      plan: 'Enterprise Monthly',
      status: 'paid',
    },
    {
      id: 'INV-2023-010',
      date: 'Aug 01, 2023',
      amount: 299,
      plan: 'Enterprise Monthly',
      status: 'paid',
    },
    {
      id: 'INV-2023-009',
      date: 'Jul 01, 2023',
      amount: 249,
      plan: 'Pro Monthly',
      status: 'paid',
    },
  ]);

  /* =========================
     COMPUTED (SIGNALS)
  ========================= */

  readonly overages = computed(() =>
    this.usage().flatMap(metric => {
      if (metric.used <= metric.limit) return [];

      const extra = metric.used - metric.limit;
      const price = this.plan().overagePrice[metric.key];

      return [{
        ...metric,
        extra,
        cost: extra * price,
      }];
    })
  );

  readonly overageTotal = computed(() =>
    this.overages().reduce((sum, o) => sum + o.cost, 0)
  );

  readonly estimatedTotal = computed(() =>
    this.plan().basePrice + this.overageTotal()
  );

  /* =========================
     UI HELPERS (PURE)
  ========================= */

  progress(metric: UsageMetric): number {
    return Math.min(
      Math.round((metric.used / metric.limit) * 100),
      100
    );
  }

  statusClass(status: Invoice['status']): string {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
    }
  }

  /* =========================
     ACTIONS (STUBS)
  ========================= */

  manageSubscription(): void {
    // TODO: navigate to billing portal (Stripe / Paddle)
    console.log('Manage subscription');
  }

  downloadInvoice(invoice: Invoice): void {
    // TODO: GET /billing/invoices/:id/pdf
    console.log('Download invoice', invoice.id);
  }
}
