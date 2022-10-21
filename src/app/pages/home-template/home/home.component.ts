import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listSubTypeJob: any = [];
  listUpdated: any = [];

  // Destroy API
  subListJob = new Subscription();
  //

  cssArrow: any = {
    cssPrevArrow:
      'position: absolute; top: 45%; left: -8px; background-color: #fff; z-index: 4; width: 3rem; height: 3rem; margin-top: -24px; text-align: center; box-shadow: 0 2px 5px 0 rgb(0 0 0 / 15%); border: 0; font-size: 1rem; line-height: 3rem; border-radius: 50%; cursor: pointer;',
    cssNextArrow:
      'position: absolute; top: 45%; right: -8px; background-color: #fff; z-index: 4; width: 3rem; height: 3rem; margin-top: -24px; text-align: center; box-shadow: 0 2px 5px 0 rgb(0 0 0 / 15%); border: 0; font-size: 1rem; line-height: 3rem; border-radius: 50%; cursor: pointer;',
  };

  listImg: any = [
    {
      name: 'Graphics & Design',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
        logo: '../../../../assets/img/graphics-design.d32a2f8.svg',
      },
    },
    {
      name: 'Digital Marketing',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
        logo: '../../../../assets/img/online-marketing.74e221b.svg',
      },
    },
    {
      name: 'Writing & Translation',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
        logo: '../../../../assets/img/writing-translation.32ebe2e.svg',
      },
    },
    {
      name: 'Video & Animation',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png',
        logo: '../../../../assets/img/video-animation.f0d9d71.svg',
      },
    },
    {
      name: 'Music & Audio',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png',
        logo: '../../../../assets/img/music-audio.320af20.svg',
      },
    },
    {
      name: 'Programming & Tech',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png',
        logo: '../../../../assets/img/programming.9362366.svg',
      },
    },
    {
      name: 'Data',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png',
        logo: '../../../../assets/img/data.718910f.svg',
      },
    },
    {
      name: 'Business',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png',
        logo: '../../../../assets/img/business.bbdf319.svg',
      },
    },
    {
      name: 'Lifestyle',
      images: {
        img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png',
        logo: '../../../../assets/img/lifestyle.745b575.svg',
      },
    },
  ];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    localStorage.setItem('wait', JSON.stringify(true));
    setTimeout(() => {
      localStorage.removeItem('wait');
    }, 3000);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.getSubTypeJob();
  }

  getSubTypeJob() {
    // API 14 (quan ly cong viec chinh): {{url}}/api/type-jobs
    this.subListJob = this.data.get('type-jobs').subscribe((result) => {
      this.listSubTypeJob = result;
      // this.listSubTypeJob = result.slice(0, 9);

      this.listUpdated = this.listSubTypeJob.map((item: any) => {
        const newItem: any = item;

        this.listImg.forEach((item2: any) => {
          if (item.name === item2.name) {
            newItem.images = item2.images;
          }
        });
        return newItem;
      });

      if (this.listSubTypeJob.length > 0)
        setTimeout(() => {
          this.initCarousel();
        }, 1000);
    });
  }

  initCarousel() {
    $('.slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow: `<i class="fas fa-angle-left left-arrow" style="${this.cssArrow.cssPrevArrow}"></i>`,
      nextArrow: `<i class="fas fa-angle-right right-arrow" style="${this.cssArrow.cssNextArrow}"></i>`,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  ngOnDestroy() {
    this.subListJob.unsubscribe();
  }
}
