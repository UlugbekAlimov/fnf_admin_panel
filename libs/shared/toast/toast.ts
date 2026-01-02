import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './toast.html',
})
export class UiToastComponent {}
