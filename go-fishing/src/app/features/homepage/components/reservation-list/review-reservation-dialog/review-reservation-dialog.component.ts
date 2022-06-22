import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { CancelReservationDialogComponent } from '../cancel-reservation-dialog/cancel-reservation-dialog.component';

@Component({
  selector: 'app-review-reservation-dialog',
  templateUrl: './review-reservation-dialog.component.html',
  styleUrls: ['./review-reservation-dialog.component.css'],
})
export class ReviewReservationDialogComponent implements OnInit {
  form: any = this.createReviewForm();

  complaintForm: any = this.createComplaintForm();

  constructor(
    public dialogRef: MatDialogRef<CancelReservationDialogComponent>,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  createReviewForm(): FormGroup {
    return new FormGroup({
      grade: new FormControl(''),
      reviewText: new FormControl('', Validators.required),
    });
  }

  createComplaintForm(): FormGroup {
    return new FormGroup({
      complaintText: new FormControl(''),
    });
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public onReviewClick() {
    if (this.form.controls['grade'].value === '') {
      this.messageService.showMessage(
        'Please enter a grade!',
        MessageType.WARNING
      );
      return;
    } else if (this.form.controls['reviewText'].value === '') {
      this.messageService.showMessage(
        'Please enter the review text!',
        MessageType.WARNING
      );
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  public onComplainClick() {
    if (this.complaintForm.controls['complaintText'].value === '') {
      this.messageService.showMessage(
        'Please enter complaint text!',
        MessageType.WARNING
      );
      return;
    }
    this.dialogRef.close(this.complaintForm.getRawValue());
  }

  get mode() {
    return this.data;
  }
}
