import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/_core/services/data.service';
@Component({
  selector: 'app-modal-course-manager',
  templateUrl: './modal-course-manager.component.html',
  styleUrls: ['./modal-course-manager.component.scss']
})
export class ModalCourseManagerComponent implements OnInit {
  @Input() flagModal: any;
  @Input() itemSuaPhim: any;
  @ViewChild('formQuanLiPhim', { static: false }) formQuanLiPhim!: NgForm;
  name: any;

  EmptyModal = {
    maKhoaHoc: '',
    tenKhoaHoc: '',
    luotXem: '',
    ngayTao: '',
    hinhAnh: '',
    moTa: '',
    maDanhMucKhoaHoc: '',
  };

  constructor(private data: DataService) {}


  ngOnChanges() {
    this.CheckModal();
    if (this.formQuanLiPhim) {
      if (this.flagModal === false) {
        this.formQuanLiPhim.setValue({ ...this.itemSuaPhim });
      } else {
        this.formQuanLiPhim.setValue({ ...this.EmptyModal });
      }
    }
  }

  ngOnInit(): void {
  }

  CheckModal() {
    if (this.flagModal === true) {
      this.name = 'Thêm Phim';
    } else {
      this.name = 'Sửa Phim';
    }
  }

  _SubmitForm() {
    this.EmptyModal.maKhoaHoc = this.formQuanLiPhim.value.taiKhoan;
    this.EmptyModal.tenKhoaHoc = this.formQuanLiPhim.value.hoTen;
    this.EmptyModal.luotXem = this.formQuanLiPhim.value.email;
    this.EmptyModal.ngayTao = this.formQuanLiPhim.value.soDT;
    this.EmptyModal.hinhAnh = this.formQuanLiPhim.value.matKhau;
    this.EmptyModal.moTa = this.formQuanLiPhim.value.maLoaiNguoiDung;
    this.EmptyModal.maDanhMucKhoaHoc =
      this.formQuanLiPhim.value.maLoaiNguoiDung;

    if (this.flagModal) {
      this.data
        .post('QuanLyKhoaHoc/CapNhatKhoaHoc', {
          ...this.EmptyModal,
          biDanh: 'abc',
          danhGia: '5',
          taiKhoanNguoiTao: 'TRUONG TAN KHAI',
          maNhom: 'GP08',
        })
        .subscribe(
          (data: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
            .then(() => {
              window.location.reload();
            });
          },
          (err) => {
            alert('Error');
          }
        );
    } else {
      console.log('themphim');

      this.data
        .post('QuanLyKhoaHoc/ThemKhoaHoc', {
          ...this.EmptyModal,
          biDanh: 'abc',
          danhGia: '5',
          taiKhoanNguoiTao: 'TRUONG TAN KHAI',
          maNhom: 'GP08',
        })
        .subscribe(
          (data: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
            .then(() => {
              window.location.reload();
            });
          },
          (err) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        );
    }
  }

}
