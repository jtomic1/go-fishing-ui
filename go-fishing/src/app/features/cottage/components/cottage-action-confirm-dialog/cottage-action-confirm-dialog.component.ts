import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cottage-action-confirm-dialog',
  templateUrl: './cottage-action-confirm-dialog.component.html',
  styleUrls: ['./cottage-action-confirm-dialog.component.css'],
})
export class CottageActionConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CottageActionConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close({ confirm: true });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
