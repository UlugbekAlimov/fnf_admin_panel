import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'education-content-structure',
  templateUrl: './content-structure.html',
  imports: [AccordionModule,],
  standalone: true,
})
export class ContentStructure {}
