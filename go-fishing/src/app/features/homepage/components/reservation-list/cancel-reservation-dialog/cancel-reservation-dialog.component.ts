import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-reservation-dialog',
  templateUrl: './cancel-reservation-dialog.component.html',
  styleUrls: ['./cancel-reservation-dialog.component.css'],
})
export class CancelReservationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CancelReservationDialogComponent>
  ) {}

  ngOnInit(): void {}

  onYesClick() {
    this.dialogRef.close({ delete: true });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
