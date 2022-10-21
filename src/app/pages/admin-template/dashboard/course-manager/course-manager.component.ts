import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss'],
})
export class CourseManagerComponent implements OnInit {
  @Output() eventEditMovie = new EventEmitter();
  @Output() eventSuaPhim = new EventEmitter();
  @Input() indexXoa: any;
  keyword: any;
  mangDanhSachPhim: any = [];
  flagEditAdd: any;

  // Destroy API
  getListMovieList = new Subscription();

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getListMovie();
  }

  getListMovie() {
    this.getListMovieList = this.data.get('jobs').subscribe((res) => {
      this.mangDanhSachPhim = res;
      console.log(this.mangDanhSachPhim);
    });
  }

  suaPhim(item: any) {
    this.flagEditAdd = false;
    this.eventEditMovie.emit(this.flagEditAdd);
    this.eventSuaPhim.emit(item);
  }

  themPhim() {
    this.flagEditAdd = true;
    this.eventEditMovie.emit(this.flagEditAdd);
  }

  xoaPhim(item: any) {
    console.log(item._id);
    const uri = `jobs/${item._id} `;
    this.data.delete(uri).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Delete successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getListMovie();
        });
      },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          text: 'Delete unsuccessfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  handleSearch() {
    this.data
      .get('QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP08')
      .subscribe((data) => {
        this.mangDanhSachPhim = data;
        if (this.keyword) {
          this.mangDanhSachPhim = this.mangDanhSachPhim.filter((item: any) => {
            if (item.maKhoaHoc !== null || item.tenKhoaHoc !== null) {
              return (
                item.tenKhoaHoc
                  .toLowerCase()
                  .indexOf(this.keyword.toLowerCase()) !== -1 ||
                item.maKhoaHoc
                  .toLowerCase()
                  .indexOf(this.keyword.toLowerCase()) !== -1
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
    this.getListMovieList.unsubscribe();
  }
}
