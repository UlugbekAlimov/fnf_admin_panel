import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@fnf-admin/environment';
import { CompanyApiItem, CompanyListResponse, CompanyCreate } from './company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly base = environment.apiUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  createCompany(dto: CompanyCreate) {
    return this.http.post<any>(`${this.base}/api/companies`, dto);
  }

  getCompaniesByPage(page: number, pageSize: number) {
    return this.http.get<CompanyListResponse>(
      `${this.base}/api/companies?page=${page}&page_size=${pageSize}`,
    );
  }

  getCompanyById(id: CompanyApiItem['id']) {
    return this.http.get<CompanyApiItem>(`${this.base}/api/companies/${id}`);
  }
}
