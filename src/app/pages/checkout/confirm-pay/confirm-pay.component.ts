import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import Swal from 'sweetalert2';

declare const creditCard: any;
@Component({
  selector: 'app-confirm-pay',
  templateUrl: './confirm-pay.component.html',
  styleUrls: ['./confirm-pay.component.scss'],
})
export class ConfirmPayComponent implements OnInit {
  idBookedJob: any;
  totalAmount: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getParamsUrl();
    creditCard();
  }

  getParamsUrl() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idBookedJob = params.get('idBookedJob');
      this.totalAmount = params.get('totalAmount');
    });
  }

  payJob() {
    this.data.patch(`jobs/booking/${this.idBookedJob}`, {}).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Booked Successfully!!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['./']);
      });
    });
  }
}
