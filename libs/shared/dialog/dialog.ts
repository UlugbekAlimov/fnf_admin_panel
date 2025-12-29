import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, ColorPickerModule, FormsModule],
})
export class DialogUI {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() btn_title: string = 'Save';
  @Input() visible: boolean = false;
  @Input() dialogStyle: Record<string, string> = { width: '25rem' };
  @Output() visibleChange = new EventEmitter<boolean>();

  name = '';
  slug = '';
  legalName = '';
  country: { name: string } | null = null;
  timezone = '';
  locale = '';
  logoUrl = '';
  primaryColor = '#008B94';
  secondaryColor = '#0984E3';
  status: { name: string } | null = null;

  countries = [{ name: 'TJ' }, { name: 'US' }, { name: 'DE' }];
  statuses = [{ name: 'Active' }, { name: 'Inactive' }];

  confirm() {
    console.log('success!');
    this.setVisible(false);
  }

  setVisible(value: boolean) {
    this.visible = value;
    this.visibleChange.emit(value); 
  }
}
