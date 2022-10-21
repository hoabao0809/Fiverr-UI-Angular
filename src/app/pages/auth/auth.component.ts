import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {}

  login(user: any) {
    this.data.post('auth/signin', user).subscribe((res: any) => {
      if (res.user.role === 'ADMIN') {
        localStorage.setItem('UserAdmin', JSON.stringify(res));
        this.router.navigate(['/admin/dashboard']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          text: 'Not Allowed!!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
