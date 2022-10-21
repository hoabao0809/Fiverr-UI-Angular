import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';

declare let $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  listCategories: any = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getSubTypeJob();
  }

  getSubTypeJob() {
    this.data.get('type-jobs').subscribe((result) => {
      this.listCategories = result;
      // this.listCategories = result.slice(0, 9);
    });
  }
}
