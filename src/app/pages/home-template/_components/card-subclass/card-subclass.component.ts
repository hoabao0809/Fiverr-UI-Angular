import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-subclass',
  templateUrl: './card-subclass.component.html',
  styleUrls: ['./card-subclass.component.scss'],
})
export class CardSubclassComponent implements OnInit {
  @Input() subJob: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewSubJob() {
    let subJobId: any = this.subJob.subTypeJobs[0]._id;
    
    this.router.navigate([`/categories/subjobs-list/${subJobId}`]);
  }
}
