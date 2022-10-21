import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  status: boolean = false;
  condition: any;

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {}

  checkLogin() {
    if (localStorage.getItem('ClientUser')) {
      this.condition = true;
    }
  }

  logOut() {
    let currentUrl = this.router.url; //Cách reload trang

    localStorage.removeItem('ClientUser');
    this.router
      .navigateByUrl('/categories', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`${currentUrl}`]);
      });
  }

  viewAccount() {
    let userInfo: any = localStorage.getItem('ClientUser');
    let idClient = JSON.parse(userInfo).user._id;

    this.router.navigate([`categories/profile-client/${idClient}`]);
  }

  ngDoCheck() {
    if (localStorage.getItem('wait')) {
      this.status = true;
    }
    if (!localStorage.getItem('wait')) {
      this.status = false;
    }
  }
}
