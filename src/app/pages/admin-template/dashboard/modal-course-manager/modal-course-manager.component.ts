import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/_core/services/data.service';
@Component({
  selector: 'app-modal-course-manager',
  templateUrl: './modal-course-manager.component.html',
  styleUrls: ['./modal-course-manager.component.scss'],
})
export class ModalCourseManagerComponent implements OnInit {
  @Input() itemJob: any;
  @ViewChild('formJobManager', { static: false }) formJobManager!: NgForm;
  action: any;

  EmptyModal = {
    name: '',
    image: '',
    rating: '',
    price: '',
    proServices: '',
    localSellers: '',
    onlineSellers: '',
    deliveryTime: '',
    type: '',
    subType: '',
  };

  constructor(private data: DataService) {}

  ngOnChanges() {
    this.CheckModal();
    if (this.formJobManager) {
      if (this.itemJob.isEdited === false) {
        this.formJobManager.setValue({ ...this.itemJob.item });
      } else {
        this.formJobManager.setValue({ ...this.EmptyModal });
      }
    }
  }

  ngOnInit(): void {}

  CheckModal() {
    if (this.itemJob.isEdited === true) {
      this.action = 'Thêm Phim';
    } else {
      this.action = 'Sửa Phim';
    }
  }

  createJob(jobInput: any) {
    // this.EmptyModal.name = this.formJobManager.value.name;
    // this.EmptyModal.image = this.formJobManager.value.image;
    // this.EmptyModal.rating = this.formJobManager.value.rating;
    // this.EmptyModal.price = this.formJobManager.value.price;
    // this.EmptyModal.proServices = this.formJobManager.value.proServices;
    // this.EmptyModal.localSellers = this.formJobManager.value.localSellers;
    // this.EmptyModal.onlineSellers = this.formJobManager.value.onlineSellers;
    // this.EmptyModal.deliveryTime = this.formJobManager.value.deliveryTime;
    // this.EmptyModal.type = this.formJobManager.value.type;
    // this.EmptyModal.subType = this.formJobManager.value.subType;

    if (this.itemJob.isEdited) {
      this.data.post('admin/jobs', jobInput).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('edit job');

      // this.data
      //   .post('QuanLyKhoaHoc/ThemKhoaHoc', {
      //     ...this.EmptyModal,
      //     biDanh: 'abc',
      //     danhGia: '5',
      //     taiKhoanNguoiTao: 'TRUONG TAN KHAI',
      //     maNhom: 'GP08',
      //   })
      //   .subscribe(
      //     (data: any) => {
      //       Swal.fire({
      //         position: 'center',
      //         icon: 'success',
      //         showConfirmButton: false,
      //         timer: 1500,
      //       }).then(() => {
      //         window.location.reload();
      //       });
      //     },
      //     (err) => {
      //       Swal.fire({
      //         position: 'center',
      //         icon: 'success',
      //         showConfirmButton: false,
      //         timer: 1500,
      //       });
      //     }
      //   );
    }
  }
}
