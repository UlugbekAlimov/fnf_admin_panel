import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonIcon, Button } from "primeng/button";

@Component({
  selector: 'education-content-structure',
  templateUrl: './content-structure.html',
  imports: [AccordionModule, Button],
  standalone: true,
})
export class ContentStructure {}
