export interface CompanyCreate {
  name: string;
  slug: string;
  timezone: string;
  country: string;
}

export type NormalizedCompanyList = {
  data: CompanyApiItem[];
  total: number;
  page: number;
};

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface CompanyApiItem {
  id: string;
  name: string;
  slug: string;
  legal_name?: string | null;
  country: string | null;
  timezone?: string | null;
  default_locale?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  logo_url: string | null;
}

export interface CompanyListResponse {
  data: CompanyApiItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export type CompanyUpdate = {
  name: string;
  legal_name: string;
  timezone: string;
  default_locale: string;
  status: string;
  country: string;
};
