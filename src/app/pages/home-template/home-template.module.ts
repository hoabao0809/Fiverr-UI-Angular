import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeTemplateRoutingModule } from './home-template-routing.module';
import { HomeTemplateComponent } from './home-template.component';
import { FooterComponent } from './_components/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { ShareModuleModule } from 'src/app/_core/shares/share-module/share-module.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_core/shares/material-module';

@NgModule({
  declarations: [HomeTemplateComponent, FooterComponent],
  imports: [
    CommonModule,
    HomeTemplateRoutingModule,
    SlickCarouselModule,
    MaterialModule,
    ShareModuleModule,
    FormsModule,
  ],
})
export class HomeTemplateModule {}
