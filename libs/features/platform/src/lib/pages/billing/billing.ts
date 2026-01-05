import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

import { ChartData, ChartOptions } from 'chart.js';

import {
  BillingPlan,
  UsageMetric,
  Invoice,
  BillingStats,
  Company,
  BillingAnalytics,
  Subscription,
} from './billing.models';

import {
  MOCK_PLAN,
  MOCK_STATS,
  MOCK_ANALYTICS,
  MOCK_COMPANIES,
  MOCK_USAGE,
  MOCK_INVOICES,
} from './billing.mocks';

import { MOCK_SUBSCRIPTIONS } from './billing.mocks';
import { BillingApi } from './billing.api';

@Component({
  selector: 'billing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    ChartModule,
  ],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css'],
})
export class Billing {

  private readonly api = inject(BillingApi);

  /* =========================
     RAW DATA
  ========================= */

  readonly plans = signal<BillingPlan[]>([]);
  readonly subscriptions = signal<Subscription[]>(MOCK_SUBSCRIPTIONS);

  /* =========================
     MOCK DATA (TEMP)
  ========================= */

  readonly usage = signal<UsageMetric[]>(MOCK_USAGE);
  readonly stats = signal<BillingStats>(MOCK_STATS);
  readonly companies = signal<Company[]>(MOCK_COMPANIES);
  readonly invoices = signal<Invoice[]>(MOCK_INVOICES);
  readonly analytics = signal<BillingAnalytics>(MOCK_ANALYTICS);

  /* =========================
     INIT LOAD
  ========================= */

  constructor() {
  effect(() => {

    this.api.getPlans().subscribe({
      next: (plans: BillingPlan[]) => {
        this.plans.set(plans.length ? plans : [MOCK_PLAN]);
      },
      error: () => {
        this.plans.set([MOCK_PLAN]);
      },
    });

    this.api.getSubscriptions().subscribe({
      next: (subs: Subscription[]) => {
        this.subscriptions.set(subs.length ? subs : MOCK_SUBSCRIPTIONS);
      },
      error: () => {
        this.subscriptions.set(MOCK_SUBSCRIPTIONS);
      },
    });

  });
}


  /* =========================
     DERIVED (IMPORTANT)
  ========================= */

  readonly activeSubscription = computed(() =>
    this.subscriptions().find(s => s.status === 'active') ?? null
  );

readonly plan = computed<BillingPlan>(() => {
  const sub = this.activeSubscription();
  const plans = this.plans();

  if (!sub) return MOCK_PLAN;

  const fullPlan = plans.find(p => p.name === sub.planName);

  return fullPlan ?? {
    name: sub.planName,
    basePrice: sub.price,
    limits: MOCK_PLAN.limits,
    overagePrice: MOCK_PLAN.overagePrice,
  };
});


  /* =========================
     VIEW MODEL
  ========================= */

  readonly vm = computed(() => ({
    plan: this.plan(),
    usage: this.usage(),
    stats: this.stats(),
    companies: this.companies(),
    invoices: this.invoices(),
    estimatedTotal: this.estimatedTotal(),
  }));

  /* =========================
     BILLING CALCULATIONS
  ========================= */

  readonly overages = computed(() =>
    this.usage().flatMap(metric => {
      if (metric.used <= metric.limit) return [];
      const extra = metric.used - metric.limit;
      return [{
        ...metric,
        extra,
        cost: extra * this.plan().overagePrice[metric.key],
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
     CHARTS
  ========================= */

  readonly plansChart = computed<ChartData<'bar'>>(() => ({
    labels: this.analytics().plans.map(p => p.name),
    datasets: [
      {
        label: 'Companies',
        data: this.analytics().plans.map(p => p.companies),
        backgroundColor: '#34d399',
        borderRadius: 6,
      },
    ],
  }));

  readonly revenueChart = computed<ChartData<'bar'>>(() => ({
    labels: this.analytics().revenue.map(r => r.name),
    datasets: [
      {
        label: 'Revenue ($)',
        data: this.analytics().revenue.map(r => r.amount),
        backgroundColor: '#60a5fa',
        borderRadius: 6,
      },
    ],
  }));

  readonly barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  /* =========================
     UI HELPERS
  ========================= */

  progress(metric: UsageMetric): number {
    return Math.min(Math.round((metric.used / metric.limit) * 100), 100);
  }

  statusClass(status: Invoice['status']): string {
    const map: Record<Invoice['status'], string> = {
      paid: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    return map[status];
  }

  manageSubscription(): void {
    console.log('Manage subscription');
  }

  downloadInvoice(invoice: Invoice): void {
    console.log('Download invoice', invoice.id);
  }
}
