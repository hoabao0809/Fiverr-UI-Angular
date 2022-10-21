import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.scss'],
})
export class ModalUpdateUserComponent implements OnInit {
  @Input() clientInfo: any;
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

  ngOnInit(): void {}

  updateUser(userInput: any) {
    // ************Xử lý đầu vào Input trả về data đúng format API****************
    let dateFormat: any = String(
      this.datePipe.transform(userInput.birthday, 'yyyy-MM-dd')
    );

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
      birthday: dateFormat,
      skill: this.skills,
      certification: this.certifications,
      gender: this.gender,
    };

    // ForEach để remove các input người dùng không update
    Object.keys(tempUserInfo).forEach((key) => {
      if (!tempUserInfo[key]) delete tempUserInfo[key];
    });

    // Bóc tách các keys cho đúng format API
    const { avatar, bookingJob, deleteAt, _id, __v, ...rest } = this.clientInfo;
    let convertFormatDate: any = String(
      this.datePipe.transform(rest.birthday, 'yyyy-MM-dd')
    );

    // Xử lý format date Birthday
    let updatedUser: any = Object.assign({}, rest, tempUserInfo, {
      birthday: convertFormatDate,
    });

    this.data.put(`users/${this.clientInfo._id}`, updatedUser).subscribe(
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
  }

  // Hàm tách Input (skills, certifications) từ người dùng và tạo Array
  generateArray(key: any, array: any) {
    let tempSkills: any = key.split(',');
    // this.skills.push(tempSkills.trim())
    tempSkills.forEach((item: any) => {
      array.push(item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
    });
  }
}
