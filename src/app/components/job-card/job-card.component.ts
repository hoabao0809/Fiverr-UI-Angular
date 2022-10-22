import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
  @Input() job: any;

  userCreated: any;

  // Destroy API
  getUserCreatedList = new Subscription();

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getUserCreated();
  }

  getUserCreated() {
    this.getUserCreatedList = this.data
      .get(`users/${this.job._id.userCreated}`)
      .subscribe((res) => {
        this.userCreated = res;
      });
  }

  navigateDetail() {
    this.router.navigate([`/categories/detail-job/${this.job._id._id}`]);
  }

  ngOnDestroy() {
    this.getUserCreatedList.unsubscribe();
  }
}
