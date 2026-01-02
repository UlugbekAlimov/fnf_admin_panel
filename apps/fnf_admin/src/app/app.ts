import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiToastComponent } from '../../../../libs/shared/toast/toast';

@Component({
  imports: [RouterModule, UiToastComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
