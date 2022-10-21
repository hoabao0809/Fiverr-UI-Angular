import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  idBookedJob: any;
  bookedJob: any;
  typePackage: any;
  someProperty: any = 1; //set default select option: gán giá trị cho biến ngay từ đầu
  serviceFee: number = 3.58;

  // Destroy API
  getBookedJobInfoList = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('wait', JSON.stringify(true));
    setTimeout(() => {
      localStorage.removeItem('wait');
    }, 3000);

    this.getParamFromUrl();
    this.getBookedJobInfo();
  }

  getParamFromUrl() {
    // this.idBookedJob = this.activatedRoute.snapshot.paramMap.get('idBookedJob')
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.idBookedJob = params.get('idBookedJob');
      this.typePackage = +params.get('typePackage');
    });
  }

  getBookedJobInfo() {
    this.getBookedJobInfoList = this.data
      .get(`jobs/${this.idBookedJob}`)
      .subscribe((res) => {
        this.bookedJob = res;
      });
  }

  checkout() {
    let clientLoggedIn = localStorage.getItem('ClientUser');
    if (!clientLoggedIn) {
      $('#openLoginModal').click();
    }
    if (clientLoggedIn) {
      this.router.navigate([
        `/checkout/confirm-pay/${this.idBookedJob}/${
          this.typePackage * this.someProperty + this.serviceFee
        }`,
      ]);
    }
  }

  ngOnDestroy() {
    this.getBookedJobInfoList.unsubscribe();
  }
}
