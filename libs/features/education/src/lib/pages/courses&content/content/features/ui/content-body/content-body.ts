import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'education-content-body',
  templateUrl: './content-body.html',
  imports: [InputTextModule, EditorModule, FileUploadModule],
  standalone: true,
})
export class ContentBody {}
