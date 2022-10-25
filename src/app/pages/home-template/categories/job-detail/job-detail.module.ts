import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailRoutingModule } from './job-detail-routing.module';
import { JobDetailComponent } from './job-detail.component';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';

@NgModule({
  declarations: [
    JobDetailComponent
  ],
  imports: [
    CommonModule,
    JobDetailRoutingModule,
    MaterialModule,
    ShareModuleModule
  ]
})
export class JobDetailModule { }
