import {
  BillingPlan,
  UsageMetric,
  BillingStats,
  Company,
  BillingAnalytics,
  Invoice,
  Subscription
} from './billing.models';

export const MOCK_PLAN: BillingPlan = {
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
};

export const MOCK_STATS: BillingStats = {
  companies: 128,
  avgUsage: 74,
  overLimit: 9,
};

export const MOCK_ANALYTICS: BillingAnalytics = {
  plans: [
    { name: 'Free', companies: 42 },
    { name: 'Pro', companies: 58 },
    { name: 'Enterprise', companies: 28 },
  ],
  revenue: [
    { name: 'Pro', amount: 17400 },
    { name: 'Enterprise', amount: 23920 },
  ],
};

export const MOCK_COMPANIES: Company[] = [
  {
    name: 'FnF Academy',
    plan: 'Enterprise',
    status: 'Active',
    users: 420,
    usage: 81,
    mrr: 299,
  },
  {
    name: 'DevHub',
    plan: 'Pro',
    status: 'Active',
    users: 120,
    usage: 63,
    mrr: 149,
  },
];

export const MOCK_USAGE: UsageMetric[] = [
  { key: 'courses', label: 'Courses', used: 42, limit: 50 },
  { key: 'lessons', label: 'Lessons', used: 380, limit: 500 },
  {
    key: 'video_minutes',
    label: 'Video Minutes',
    used: 16200,
    limit: 15000,
    unit: 'min',
  },
  { key: 'materials', label: 'Materials', used: 980, limit: 2000 },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: 'Jan 01, 2024',
    amount: 299,
    plan: 'Enterprise',
    status: 'paid',
  },
  {
    id: 'INV-2023-012',
    date: 'Dec 01, 2023',
    amount: 299,
    plan: 'Enterprise',
    status: 'paid',
  },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_001',
    companyId: 'cmp_1',
    companyName: 'FnF Academy',
    planId: 'enterprise',
    planName: 'Enterprise',
    status: 'active',
    billingPeriodStart: '2025-12-01',
    billingPeriodEnd: '2026-01-01',
    price: 299,
    currency: 'USD',
    createdAt: '2025-01-01',
  },
];
