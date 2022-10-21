import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/_core/services/data.service';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.scss'],
})
export class ModalSignupComponent implements OnInit {
  picker: any;
  // events: string[] = [];
  constructor(private datePipe: DatePipe, private data: DataService) {}

  ngOnInit(): void {}

  register(user: any) {
    let dateFormat: any = this.datePipe.transform(user.birthday, 'yyyy-MM-dd');
    let newUser: any = {
      ...user,
      birthday: dateFormat,
      skill: ['LoL', 'WEB', 'DESIGN'],
      certification: ['DIB', 'PYNOW'],
      gender: true,
      type: 'USER',
    };

    this.data.post('auth/signup', newUser).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sign up successfully!!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          $('#signupModal').modal('hide');
          $('#openLoginModal').click();
        });
      },
      (err: any) => {
        console.log(err);
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

  signIn() {
    $('#signupModal').modal('hide');
    $('#openLoginModal').click();
  }
}
