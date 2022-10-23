import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  @Output() eventEditUser = new EventEmitter();
  keyword: string = '';

  listUsers: any;

  // Destroy API
  getListList = new Subscription();

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.getListList = this.data.get('users').subscribe((res) => {
      this.listUsers = res;
    });
  }

  suaNguoiDung(user: any) {
    this.eventEditUser.emit(user);
  }

  themNguoiDung() {
    this.eventEditUser.emit(null);
  }

  xoaNguoiDung(_id: any) {
    this.data.delete(`users/${_id}`).subscribe((data: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Delete successfully!!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.handleSearch();
      });
    });
  }

  handleSearch() {
    this.data.get('users').subscribe((res) => {
      this.listUsers = res;

      if (this.keyword) {
        this.listUsers = this.listUsers.filter((item: any) => {
          if (item.name) {
            return (
              item.name.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
            );
          } else {
            return;
          }
        });
      }
    });
  }

  Logout() {
    localStorage.removeItem('UserAdmin');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.getListList.unsubscribe();
  }
}
