import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.scss'],
})
export class HomeTemplateComponent implements OnInit {
  status: boolean = false;

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  // ngDoCheck() {
  //   if (localStorage.getItem("wait")) {
  //     this.status = true;
  //   }
  //   if (!localStorage.getItem("wait")) {
  //     this.status = false;
  //   }
  // }
}
