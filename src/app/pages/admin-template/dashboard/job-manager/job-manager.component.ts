import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_core/services/data.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-manager',
  templateUrl: './job-manager.component.html',
  styleUrls: ['./job-manager.component.scss'],
})
export class CourseManagerComponent implements OnInit {
  @Output() eventEditMovie = new EventEmitter();
  @Input() indexXoa: any;
  keyword: any;
  listJobs: any = [];
  isEdited: any;

  // Destroy API
  getJobsManagement = new Subscription();

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.getJobsManagement = this.data.get('jobs').subscribe((res) => {
      this.listJobs = res;
    });
  }

  updateJob(item: any) {
    this.isEdited = true;
    this.eventEditMovie.emit({ isEdited: this.isEdited, item });
  }

  addJob() {
    this.isEdited = false;
    this.eventEditMovie.emit({ isEdited: this.isEdited, item: {} });
  }

  deleteJob(item: any) {
    const uri = `admin/jobs/${item._id} `;
    this.data.delete(uri).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Delete successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.handleSearch();
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
    this.data.get('jobs').subscribe((data) => {
      this.listJobs = data;
      if (this.keyword) {
        this.listJobs = this.listJobs.filter((item: any) => {
          if (item.name !== null) {
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
    this.getJobsManagement.unsubscribe();
  }
}
