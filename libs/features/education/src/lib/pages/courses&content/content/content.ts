import { Component } from "@angular/core";
import { ContentStructure } from "./content-structure/content-structure";
import { ContentBody } from "./content-body/content-body";

@Component({
  selector: "education-content",
  templateUrl: "./content.html",
  standalone: true,
  imports: [ContentStructure, ContentBody],
})
export class EducationContent {

}
