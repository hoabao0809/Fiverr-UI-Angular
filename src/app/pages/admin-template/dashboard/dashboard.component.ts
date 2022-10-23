import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemSuaPhim: any;
  flag: any;
  sideMenuContext: any;

  userEdit: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openModalUser(user: any) {
    this.userEdit = user;
  }

  suaPhim(event: any) {
    this.itemSuaPhim = event;
  }
}
