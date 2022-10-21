import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtypeJobListRoutingModule } from './subtype-job-list-routing.module';
import { SubtypeJobListComponent } from './subtype-job-list.component';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubtypeJobListComponent,
  ],
  imports: [
    CommonModule,
    SubtypeJobListRoutingModule,
    ShareModuleModule,
    MaterialModule,
    FormsModule
  ]
})
export class SubtypeJobListModule { }
