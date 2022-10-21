import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {}

  login(user: any) {
    let currentUrl = this.router.url; //Cách reload trang
    this.data.post('auth/signin', user).subscribe(
      (res) => {
        if (res.user.role === 'CLIENT') {
          localStorage.setItem('ClientUser', JSON.stringify(res));
          $('#loginModal').modal('hide');
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router
            .navigateByUrl('/categories', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`${currentUrl}`]);
            });
        } else if (res.user.role === 'ADMIN') {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text: 'Failed to log in via user account Admin!!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
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

  signUp() {
    // Nếu dùng .hide() sẽ bị overlay => dùng modal('hide)
    $('#loginModal').modal('hide');
    $('#openSignupModal').click();
  }
}
