import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss'],
})
export class ProfileClientComponent implements OnInit {
  // Destroy API
  getClientInfoList = new Subscription();
  //

  idClient: any;
  clientInfo: any;
  hasName: any;
  listBookedGigs: any;
  // Clone 1 valuable khác của default avatar
  defaultUserProfileUrl: any = './../../../../../assets/img/avatar.png';
  activeImageUrl: any = this.defaultUserProfileUrl;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // localStorage.setItem('wait', JSON.stringify(true));
    // setTimeout(() => {
    //   localStorage.removeItem('wait');
    // }, 3000);
    
    this.checkLogin();
    this.checkLogin();
    this.getParamsUrl();
    this.getClientInfo();
  }

  checkLogin() {
    // Trong lúc dùng nếu người dùng Log Out sẽ redirect về trang HomePage
    let logIn: any = localStorage.getItem('ClientUser');

    if (logIn) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  onFileChanged(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.activeImageUrl = reader.result;
      };
    }
  }

  getParamsUrl() {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.idClient = res.params.idClient;
    });
  }

  getClientInfo() {
    this.getClientInfoList = this.data
      .get(`users/${this.idClient}`)
      .subscribe((res) => {
        this.clientInfo = res;
        this.checkName(this.clientInfo.name);
        this.listBookedGigs = res.bookingJob;
      });
  }

  checkName(name: any) {
    if (name) {
      this.hasName = true;
    } else {
      this.hasName = false;
    }
  }

  ngOnDestroy() {
    this.getClientInfoList.unsubscribe();
  }
}
