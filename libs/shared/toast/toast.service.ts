import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) {}

  show(summary: string, detail?: string, severity: ToastSeverity = 'info', life = 3000) {
    this.messageService.add({ severity, summary, detail, life });
  }

  success(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'success', life);
  }

  info(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'info', life);
  }

  warn(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'warn', life);
  }

  error(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'error', life);
  }

  secondary(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'secondary', life);
  }

  contrast(summary: string, detail?: string, life?: number) {
    this.show(summary, detail, 'contrast', life);
  }

  clear() {
    this.messageService.clear();
  }
}
