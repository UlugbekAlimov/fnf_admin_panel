import { Component } from '@angular/core';

import { ChipComponent } from '../../../../../../shared/chip'

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Select } from 'primeng/select';

@Component({
    selector: 'management-dashboard',
    standalone: true,
    imports: [ButtonModule, CardModule, Select, ChipComponent ],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
})
export class ManagementDashboard {}
