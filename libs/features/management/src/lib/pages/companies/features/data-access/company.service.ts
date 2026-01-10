import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@fnf-admin/environment';
import {
  CompanyApiItem,
  CompanyListResponse,
  CompanyCreate,
  NormalizedCompanyList,
  CompanyUpdate,
} from '../model/company.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly base = environment.apiUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  createCompany(dto: CompanyCreate) {
    return this.http.post<any>(`${this.base}/api/companies`, dto);
  }

  getCompaniesByPage(page: number, pageSize: number): Observable<NormalizedCompanyList> {
    const params = new HttpParams().set('page', page).set('page_size', pageSize);

    return this.http
      .get<CompanyListResponse | CompanyApiItem[]>(`${this.base}/api/companies`, { params })
      .pipe(map((raw) => normalizeCompanyList(raw, page)));
  }

  getCompanyById(id: CompanyApiItem['id']) {
    return this.http.get<CompanyApiItem>(`${this.base}/api/companies/${id}`);
  }

  updateCompany(companyId: string, dto: CompanyUpdate) {
    return this.http.patch<any>(`${this.base}/api/companies/${companyId}`, dto);
  }

  deleteCompany(companyId: string){
    return this.http.delete<void>(`${this.base}/api/companies/${companyId}`)
  }
}

function normalizeCompanyList(
  raw: CompanyListResponse | CompanyApiItem[],
  fallbackPage: number,
): NormalizedCompanyList {
  if (Array.isArray(raw)) {
    return { data: raw, total: raw.length, page: fallbackPage };
  }

  const anyRaw = raw as any;

  const data: CompanyApiItem[] = anyRaw?.data ?? anyRaw?.items ?? anyRaw?.results ?? [];

  const total: number = anyRaw?.total ?? anyRaw?.count ?? data.length;

  const page: number = anyRaw?.page ?? fallbackPage;

  return { data, total, page };
}
