import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  couseCategory: any;
  searchValue: any;

  BannerData: any = [
    {
      img: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png',
      name: 'Andrea',
      job: 'Fashion Designer',
    },

    {
      img: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203045/bg-hero-2-1792-x1.png',
      name: 'Moon',
      job: 'Marketing Expert',
    },
    {
      img: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png',
      name: 'Ritika',
      job: 'Shoemaker and Designer',
    },
    {
      img: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734108/bg-hero-4-1792-x1.png',
      name: 'Zach',
      job: 'Bar Owner',
    },
    {
      img: 'https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png',
      name: 'Gabrielle',
      job: 'Video Editor',
    },
  ];

  slideConfig: any = {
    dots: false,
    infinite: true,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    draggable: false,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit($event: any) {
    if ($event.keyCode === 13 || $event.type === 'click') {
      this.router.navigate([`/categories/search/${this.searchValue}`]);
    }
  }
}
