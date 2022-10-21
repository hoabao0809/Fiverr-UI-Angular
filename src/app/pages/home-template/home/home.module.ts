import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BannerComponent } from '../_components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { CardSubclassComponent } from '../_components/card-subclass/card-subclass.component';
import { NavbarComponent } from '../_components/navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent, BannerComponent, CardSubclassComponent, NavbarComponent],
  imports: [CommonModule, HomeRoutingModule, SlickCarouselModule, FormsModule],
})
export class HomeModule {}
