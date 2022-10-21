import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { NavbarCategoriesComponent } from '../_components/navbar-categories/navbar-categories.component';
import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoriesComponent,
    NavbarCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ShareModuleModule,
    FormsModule 
  ]
})
export class CategoriesModule { }
