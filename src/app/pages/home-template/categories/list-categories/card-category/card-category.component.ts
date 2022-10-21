import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss'],
})
export class CardCategoryComponent implements OnInit {
  @Input() subJob: any;
  jobs: any;

  // Destroy API
  getDetailSubTypeJobList = new Subscription();

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getDetailSubTypeJob();
  }

  // API 24
  getDetailSubTypeJob() {
    this.getDetailSubTypeJobList = this.data
      .get(`/jobs/by-sub-type?subType=${this.subJob._id}&skip=0&llimit=10`)
      .subscribe((res) => {
        this.jobs = res;
      });
  }

  getJobs() {
    this.router.navigate([`/categories/subjobs-list/${this.subJob._id}`]);
    // console.log(this.subJob._id);
  }

  ngOnDestroy() {
    this.getDetailSubTypeJobList.unsubscribe();
  }
}
