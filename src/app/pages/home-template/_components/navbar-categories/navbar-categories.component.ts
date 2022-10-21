import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-categories',
  templateUrl: './navbar-categories.component.html',
  styleUrls: ['./navbar-categories.component.scss'],
})
export class NavbarCategoriesComponent implements OnInit {
  listCategories: any = [];
  condition: any;
  searchValue: any;

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
    this.getSubTypeJob();
  }

  checkLogin() {
    if (localStorage.getItem('ClientUser')) {
      this.condition = true;
    }
  }

  getSubTypeJob() {
    this.data.get('type-jobs').subscribe((result) => {
      console.log(result)
      this.listCategories = result;
      // this.listCategories = result.slice(0, 9);
    });
  }

  viewAccount() {
    let userInfo: any = localStorage.getItem('ClientUser');
    let idClient = JSON.parse(userInfo).user._id;

    this.router.navigate([`categories/profile-client/${idClient}`]);
  }

  logOut() {
    let currentUrl = this.router.url; //Cách reload trang

    localStorage.removeItem('ClientUser');
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Log out successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router
      .navigateByUrl('/categories', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`${currentUrl}`]);
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    let activeNavbar = document.querySelector('.navbar-inverse') as HTMLElement;
    let addNavbar = document.querySelector('#CategoriesMenu') as HTMLElement;
    let searchHeader = document.querySelector('#search-header') as HTMLElement;

    // if (window.pageYOffset > element.clientHeight) {
    //   element.classList.add('navbar-inverse');
    // } else {
    //   element.classList.remove('navbar-inverse');
    // }

    // if (activeNavbar) {
    if (window.pageYOffset > element.clientHeight) {
      searchHeader.style.opacity = '1';
      addNavbar.style.visibility = 'visible';

      searchHeader.style.transition = 'all 0.2s ease';
      addNavbar.style.opacity = '1';
      addNavbar.style.transition = 'all 0.2s ease';
    } else {
      addNavbar.style.opacity = '0';
      addNavbar.style.visibility = 'hidden';
      addNavbar.style.transition = 'all 0.2s ease';
      searchHeader.style.opacity = '0';
      searchHeader.style.transition = 'all 0.2s ease';
    }
  }

  onSubmit($event: any) {
    if ($event.keyCode === 13 || $event.type === 'click') {
      this.router.navigate([`/categories/search/${this.searchValue}`]);
    }
  }
}
