import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_core/shares/material-module';


@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    ShareModuleModule,
    FormsModule,
    MaterialModule

  ]
})
export class SearchPageModule { }
