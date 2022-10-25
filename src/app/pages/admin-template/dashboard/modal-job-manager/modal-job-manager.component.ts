import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/_core/services/data.service';

@Component({
  selector: 'app-modal-job-manager',
  templateUrl: './modal-job-manager.component.html',
  styleUrls: ['./modal-job-manager.component.scss'],
})
export class ModalJobManagerComponent implements OnInit {
  @Input() itemJob: any;
  @ViewChild('formJobManager', { static: false }) formJobManager!: NgForm;
  action: any;
  isEdited: any;

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

  ngOnInit(): void {}

  ngOnChanges() {
    this.CheckModal();
    if (this.formJobManager) {
      if (this.itemJob.isEdited) {
        const { _id, userCreated, __v, ...rest } = this.itemJob.item;
        this.formJobManager.setValue({ ...rest });
      } else {
        this.formJobManager.setValue({ ...this.EmptyModal });
      }
    }
  }

  CheckModal() {
    this.isEdited = this.itemJob?.isEdited;
    if (this.itemJob?.isEdited) {
      this.action = 'Update Job ';
    } else {
      this.action = 'Add Job';
    }
  }

  createJob(jobInput: any) {
    if (this.itemJob.isEdited) {
      const { _id, userCreated, __v, ...rest } = this.itemJob.item;
      const updatedJob: any = { ...rest, ...jobInput };

      this.data
        .put(`admin/jobs/${this.itemJob.item._id}`, updatedJob)
        .subscribe(
          (data: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = '/admin';
            });
          },
          (err) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
    } else {
      this.data.post('admin/jobs', jobInput).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = '/admin';
          });
        },
        (err) => {
        }
      );
    }
  }
}
