import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'ui-chip',
  imports: [CommonModule],
  templateUrl: './chip.html',
  styleUrls: ['./chip.css'],
})
export class ChipComponent {
  @Input() icon?: string;
  @Input() variant: 'success' | 'danger' | 'warning' | 'info' = 'success';

  get variantClass() {
    return {
      success: 'bg-green-100 text-green-700',
      danger: 'bg-red-100 text-red-700',
      warning: 'bg-amber-100 text-amber-700',
      info: 'bg-sky-100 text-sky-700',
    }[this.variant];
  }
}
