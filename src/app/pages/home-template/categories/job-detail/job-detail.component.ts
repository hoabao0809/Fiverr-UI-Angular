import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { Lightbox } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  idDetailJob: any;
  detailJob: any;
  idCreatedUser: any;
  createdUser: any;
  comments: any;
  rateArray: any;
  rate: any;

  panelOpenState: boolean = false;

  packages: any = [
    {
      type: 'Basic',
      intro: 'Installation [Contact First ]',
      name: 'Gold Package',
      price: '',
      description: 'Create a simple web app for your business',
      delivery: 3,
    },
    {
      type: 'Standard',
      intro: 'Install + Customise [Contact First]',
      name: 'Platinum Package',
      price: '',
      description:
        'Create a complex web application for your business with full of options',
      delivery: 4,
    },
    {
      type: 'Premium',
      intro: 'Online shop Customise [!Contact]',
      name: 'Diamond Package',
      price: '',
      description:
        'Create a professional web application for your business with full of options',
      delivery: 5,
    },
  ];

  // Destroy API
  getDetailJobList = new Subscription();
  getCommentsList = new Subscription();
  //

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private _lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.getParamFromUrl();
    this.getDetailJob();
    // this.getComments();
  }

  getParamFromUrl() {
    this.idDetailJob = this.activatedRoute.snapshot.paramMap.get('idDetailJob');
  }

  // API 23
  getDetailJob() {
    this.getDetailJobList = this.data
      .get(`jobs/${this.idDetailJob}`)
      .subscribe((res) => {
        this.detailJob = res;
        this.idCreatedUser = this.detailJob.userCreated;
        this.packages[0].price = res.price;
        this.packages[1].price = res.price * 1.5;
        this.packages[2].price = res.price * 2;
        this.rateArray = Array(res.rating).fill(1);
        this.rate = res.rating;

        this.data.get(`users/${this.idCreatedUser}`).subscribe((res) => {
          this.createdUser = res;
        });
      });
  }

  getComments() {
    this.getCommentsList = this.data
      .get(`comments/by-job/${this.idDetailJob}`)
      .subscribe((res) => {
        this.comments = res;
      });
  }

  ngOnDestroy() {
    this.getDetailJobList.unsubscribe();
    this.getCommentsList.unsubscribe();
  }
}
