import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";

@Component({
  selector: "education-group-create",
  standalone: true,
  imports: [Dialog, Button, Select, InputText, FormsModule],
  templateUrl: "./group-create.html"
})
export class GroupCreate implements OnChanges {
  private dialogVisible = false;

  @Input() set visible(value: boolean) {
    this.dialogVisible = value;
    if (value && !this.editingGroup) {
      this.reset();
    }
  }
  get visible() {
    return this.dialogVisible;
  }

  @Input() editingGroup: any | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<{ id: number; data: any }>();

  name = "";
  slug = "";
  city: { name: string } | null = null;
  plan: { name: string } | null = null;
  status: { name: string } | null = null;

  cities = [{ name: "English" }, { name: "Spanish" }, { name: "German" }];
  plans = [{ name: "120" }, { name: "240" }, { name: "360" }];
  statuses = [{ name: "Active" }, { name: "Pending" }, { name: "Blocked" }];

  get isEditMode(): boolean {
    return !!this.editingGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["editingGroup"]) {
      if (this.editingGroup) {
        this.name = this.editingGroup.name ?? "";
        this.slug = this.editingGroup.slug ?? "";
        this.city =
          this.cities.find((item) => item.name === this.editingGroup.city) ?? this.cities[0];
        this.plan =
          this.plans.find((item) => item.name === this.editingGroup.plan) ?? this.plans[0];
        this.status =
          this.statuses.find((item) => item.name === this.editingGroup.status) ?? this.statuses[0];
      } else {
        this.reset();
      }
    }
  }

  close() {
    this.reset();
    this.visibleChange.emit(false);
  }

  handleVisibleChange(value: boolean) {
    if (!value) {
      this.reset();
      this.visibleChange.emit(false);
    }
  }

  submit() {
    const name = this.name.trim();
    const slug = this.slug.trim();
    if (!name || !slug) {
      return;
    }

    const payload = {
      name,
      slug,
      city: this.city?.name ?? "English",
      plan: this.plan?.name ?? "120",
      status: this.status?.name ?? "Active"
    };

    if (this.editingGroup) {
      this.update.emit({ id: this.editingGroup.id, data: payload });
    } else {
      this.create.emit(payload);
    }
    this.reset();
    this.visibleChange.emit(false);
  }

  private reset() {
    this.name = "";
    this.slug = "";
    this.city = this.cities[0];
    this.plan = this.plans[0];
    this.status = this.statuses[0];
  }
}
