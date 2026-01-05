export interface CompanyCreate {
  name: string;
  slug: string;
  timezone: string;
  country: string;
}

export interface Company {
  page: number;
  pagSize: number;
}

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface CompanyTable {
    id: number;
    name: string;
    slug: string;
    status: string;
    country: string;
    legal_name: string;
    created_at: string;
    updated_at: string;
    logo: string;
    statusVariant: string;
}

export interface CompanyApiItem {
  id: number;
  name: string;
  slug: string;
  legal_name?: string | null;
  country: string | null;
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
