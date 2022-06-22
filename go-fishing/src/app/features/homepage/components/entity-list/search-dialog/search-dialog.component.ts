import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'password-change-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css'],
})
export class SearchDialogComponent {
  minDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private messageService: MessageService
  ) {}

  onCancelClick() {
    this.dialogRef.close({ search: false });
  }

  onSearchClick() {
    if (!this.validateFormDates()) {
      this.messageService.showMessage(
        'Invalid date range!',
        MessageType.WARNING
      );
      return;
    } else if (!this.validateFormCapacity()) {
      this.messageService.showMessage('Invalid capacity!', MessageType.WARNING);
    } else if (!this.validateFormPrice()) {
      this.messageService.showMessage(
        'Invalid price input!',
        MessageType.WARNING
      );
      return;
    } else {
      this.dialogRef.close({ search: true });
    }
  }

  validateFormPrice(): boolean {
    const exp = new RegExp('[0-9]');

    const minPrice = this.data.controls['minPrice'].value;
    const maxPrice = this.data.controls['maxPrice'].value;

    if (maxPrice < minPrice && maxPrice !== null) return false;

    if (maxPrice !== null) {
      return exp.test(String(minPrice)) && exp.test(String(maxPrice));
    } else {
      return exp.test(String(minPrice));
    }
  }

  validateFormDates(): boolean {
    const startDateControl = this.data.controls['startDate'];
    const endDateControl = this.data.controls['endDate'];

    return startDateControl.valid && endDateControl.valid;
  }

  validateFormCapacity(): boolean {
    const exp = new RegExp('[0-9]');

    return exp.test(String(this.data.controls['capacity'].value));
  }
}
