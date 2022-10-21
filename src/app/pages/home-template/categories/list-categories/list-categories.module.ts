import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoriesRoutingModule } from './list-categories-routing.module';
import { ListCategoriesComponent } from './list-categories.component';
import { CardCategoryComponent } from './card-category/card-category.component';

@NgModule({
  declarations: [
    ListCategoriesComponent,
    CardCategoryComponent
  ],
  imports: [
    CommonModule,
    ListCategoriesRoutingModule
  ]
})
export class ListCategoriesModule { }
