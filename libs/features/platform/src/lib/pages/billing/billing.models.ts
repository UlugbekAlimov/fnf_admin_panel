/* =========================
   CORE TYPES
========================= */

export type UsageKey =
  | 'courses'
  | 'lessons'
  | 'video_minutes'
  | 'materials';

/* =========================
   PLAN
========================= */

export interface BillingPlan {
  id?: string;               // ← пригодится для backend
  name: string;
  basePrice: number;
  limits: Record<UsageKey, number>;
  overagePrice: Record<UsageKey, number>;
}

/* =========================
   SUBSCRIPTIONS
========================= */

export interface Subscription {
  id: string;
  companyId: string;
  companyName?: string;

  planId: string;
  planName: string;

  status: 'active' | 'paused' | 'cancelled';

  billingPeriodStart: string; // ISO date
  billingPeriodEnd: string;   // ISO date

  price: number;              // price at the moment of subscription
  currency: 'USD' | 'EUR';    // расширяемо

  createdAt: string;
  updatedAt?: string;
}

/* =========================
   USAGE
========================= */

export interface UsageMetric {
  key: UsageKey;
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

/* =========================
   INVOICES
========================= */

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
}

/* =========================
   STATS
========================= */

export interface BillingStats {
  companies: number;
  avgUsage: number;
  overLimit: number;
}

/* =========================
   COMPANIES
========================= */

export interface Company {
  id?: string;
  name: string;
  plan: string;
  status: 'Active' | 'Paused';
  users: number;
  usage: number;
  mrr: number;
}

/* =========================
   ANALYTICS
========================= */

export interface BillingAnalytics {
  plans: {
    name: string;
    companies: number;
  }[];
  revenue: {
    name: string;
    amount: number;
  }[];
}
