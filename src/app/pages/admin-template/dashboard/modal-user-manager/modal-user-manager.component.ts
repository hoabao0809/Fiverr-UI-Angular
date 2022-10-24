import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/_core/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-user-manager',
  templateUrl: './modal-user-manager.component.html',
  styleUrls: ['./modal-user-manager.component.scss'],
})
export class ModalUserManagerComponent implements OnInit {
  @Input() userEdit: any;

  @ViewChild('formUserManger', { static: false }) formUserManger!: NgForm;

  picker: any;

  user: any;
  skills: any = [];
  certifications: any = [];
  gender: boolean = false;
  updatedUser: any;

  constructor(
    private data: DataService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
      role: '',
      skill: '',
      certification: '',
    };
  }

  // Show data ra modal
  ngOnChanges() {
    if (this.formUserManger) {
      if (this.userEdit) {
        const { _id, bookingJob, __v, ...rest } = this.userEdit;

        // let convertDate: any = this.datePipe.transform(
        //   this.userEdit.birthday,
        //   'yyyy-MM-dd'
        // );

        this.formUserManger.setValue({ ...rest });
      } else {
        this.formUserManger.setValue({ ...this.user });
      }
    }
  }

  createUser(userInput: any) {
    // ************Xử lý đầu vào Input trả về data đúng format API****************
    // let dateFormat: any = String(
    //   this.datePipe.transform(userInput.birthday, 'yyyy-MM-dd')
    // );

    //  Tạo thông tin Skills và Certifications
    this.generateArray(userInput.skill, this.skills);
    this.generateArray(userInput.certification, this.certifications);

    // Handle input về gender cho đúng API
    switch (userInput.gender) {
      case 'true':
        this.gender = true;
        break;
      case 'false':
        this.gender = false;
        break;
    }

    // Clone user chuẩn format
    let tempUserInfo: any = {
      ...userInput,
      skill: this.skills,
      certification: this.certifications,
      gender: this.gender,
    };

    // ********** Kiểm tra người dùng sử dụng modal Create / Edit
    if (this.userEdit) {
      // ForEach để remove các input người dùng không update

      // Object.keys(tempUserInfo).forEach((key) => {
      //   if (!tempUserInfo[key]) delete tempUserInfo[key];
      // });

      // Bóc tách các keys cho đúng format API
      const { _id, __v, ...rest } = this.userEdit;
      // let convertFormatDate: any = String(
      //   this.datePipe.transform(rest.birthday, 'yyyy-MM-dd')
      // );

      // Xử lý format date Birthday
      let updatedUser: any = { ...rest, ...tempUserInfo };
      console.log(updatedUser);

      this.data.put(`admin/users/${this.userEdit._id}`, updatedUser).subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Update successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text: 'Update unsuccessfully',

            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      this.data.post('admin/users', tempUserInfo).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: res.message,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }
  }

  // Hàm tách Input (skills, certifications) từ người dùng và tạo Array
  generateArray(key: any, array: any) {
    let tempSkills: any = key.toString().split(',');
    // this.skills.push(tempSkills.trim())
    tempSkills.forEach((item: any) => {
      array.push(item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
    });
  }
}
