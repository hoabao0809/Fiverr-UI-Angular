import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  idTypejob: any;
  subTypeJobs: any;
  categoryName: any;
  subTypeDetail: any;
  categoryID: any;
  // subTypeJob: any

  // Destroy API
  getSubTypeJobsList = new Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('wait', JSON.stringify(true));
    setTimeout(() => {
      localStorage.removeItem('wait');
    }, 3000);
    
    this.getPramsFromUrl();
    this.getSubTypeJobs();
  }

  getPramsFromUrl() {
    this.idTypejob = this.activatedRoute.snapshot.paramMap.get('idCategory');
  }

  // API 17
  getSubTypeJobs() {
   this.getSubTypeJobsList = this.data.get(`type-jobs/${this.idTypejob}`).subscribe((res) => {
      this.categoryName = res.name;
      this.subTypeJobs = res.subTypeJobs;
    });
  }

  ngOnDestroy() {
    this.getSubTypeJobsList.unsubscribe();
  }
}
