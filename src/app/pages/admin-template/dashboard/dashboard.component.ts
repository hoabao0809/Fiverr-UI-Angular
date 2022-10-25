import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itemJob: any;
  sideMenuContext: any;

  userEdit: any;

  accessDashboard = new Subscription();

  constructor(private router: Router, private data: DataService) {}

  ngOnInit(): void {
    this.getDashboardAccess();
  }

  getDashboardAccess() {
    this.accessDashboard = this.data.get('admin').subscribe((res) => {
      console.log(res);
    });
  }

  openModalUser(user: any) {
    this.userEdit = user;
  }

  openModalJob(event: any) {
    this.itemJob = event;
  }

  ngOnDestroy() {
    this.accessDashboard.unsubscribe();
  }
}
