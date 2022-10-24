import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subtype-job-list',
  templateUrl: './subtype-job-list.component.html',
  styleUrls: ['./subtype-job-list.component.scss'],
})
export class SubtypeJobListComponent implements OnInit {
  idSubjob: any;
  subJob: any;

  conditionObject: any = {};
  servicesCount: any;
  toggleSliders: any = [
    {
      isChecked: false,
      name: 'Pro Services',
      type: 'proServices',
    },
    {
      isChecked: false,
      name: 'Local Sellers',
      type: 'localSellers',
    },
    {
      isChecked: false,
      name: 'Online Sellers',
      type: 'onlineSellers',
    },
  ];

  // Destroy API
  subTypeJobList = new Subscription();
  getJobsBySubTypeList = new Subscription();
  //

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('wait', JSON.stringify(true));
    setTimeout(() => {
      localStorage.removeItem('wait');
    }, 3000);

    this.getParamId();
    this.getTypeJob();
    this.getJobsBySubType();
  }

  getParamId() {
    this.idSubjob = this.activatedRoute.snapshot.paramMap.get('idSubjob');
  }

  productArray: any = [];
  arrays: any = [];
  backup: any = [];

  getTypeJob() {
    this.subTypeJobList = this.data
      .get(`sub-type-jobs/${this.idSubjob}`)
      .subscribe((res) => {   
        this.subJob = res;
      });
  }

  getJobsBySubType() {
    this.getJobsBySubTypeList = this.data
      .get(`jobs/by-sub-type?subType=${this.idSubjob}&skip=0&llimit=10`)
      .subscribe(
        (res) => {
          this.productArray = res;
          this.servicesCount = this.productArray.length;
          this.arrays = res;
          this.backup = [...res];
        },
        (err) => {
          throw err;
        }
      );
  }

  tempArray: any = [];
  newArray: any = [];

  onChange(event: any) {
    // this.filterCondition = {event.source.name: event.checked}
    let filterService = event.source.name;
    let filterCondition = event.checked;
    this.conditionObject = { [filterService]: filterCondition };

    if (event.checked) {
      this.tempArray = this.arrays.filter(
        (e: any) => e[`${filterService}`] == true
      );
      this.productArray = [];
      this.newArray.push(this.tempArray);
      for (let i = 0; i < this.newArray.length; i++) {
        let firstArray = this.newArray[i];
        for (let i = 0; i < firstArray.length; i++) {
          let obj = firstArray[i];
          this.productArray.push(obj);
          this.servicesCount = this.productArray.length;
        }
      }
    } else {
      this.tempArray = this.productArray.filter(
        (e: any) => e[`${filterService}`] == false
      );

      this.newArray = [];
      this.productArray = [];
      this.newArray.push(this.tempArray);

      if (this.newArray[0].length === 0) {
        this.productArray = [...this.backup];
        this.servicesCount = this.productArray.length;
      } else {
        for (let i = 0; i < this.newArray.length; i++) {
          let firstArray = this.newArray[i];
          for (let i = 0; i < firstArray.length; i++) {
            let obj = firstArray[i];
            this.productArray.push(obj);
            // if (this.productArray.length === 0) {
            //   this.productArray.push(this.backup);
            // }

            this.servicesCount = this.productArray.length;
            // if(this.productArray === []){
            // }
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.subTypeJobList.unsubscribe();
    this.getJobsBySubTypeList.unsubscribe();
  }
}
