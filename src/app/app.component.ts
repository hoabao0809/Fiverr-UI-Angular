import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fiverr';
  status: boolean = false;

  // ngDoCheck() {
  //   if (localStorage.getItem('wait')) {
  //     this.status = true;
  //   }
  //   if (!localStorage.getItem('wait')) {
  //     this.status = false;
  //   }
  // }
}
