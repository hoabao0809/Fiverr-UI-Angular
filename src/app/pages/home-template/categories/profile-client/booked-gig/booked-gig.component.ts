import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-booked-gig',
  templateUrl: './booked-gig.component.html',
  styleUrls: ['./booked-gig.component.scss'],
})
export class BookedGigComponent implements OnInit {
  @Input() gig: any;
  bookedGig: any;

  userCreated: any;

  // Destroy API
  getBookedJobList = new Subscription

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getBookedJob();
  }

  getBookedJob() {
   this.getBookedJobList = this.data.get(`jobs/${this.gig}`).subscribe((res) => {
      this.bookedGig = res;
    });
  }


  navigateDetail() {
    this.router.navigate([`/categories/detail-job/${this.gig}`]);
  }

  ngOnDestroy() {
    this.getBookedJobList.unsubscribe();
  }
}
