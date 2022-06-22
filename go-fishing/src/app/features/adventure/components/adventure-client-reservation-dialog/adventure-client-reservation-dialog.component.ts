import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoyaltyService } from 'src/app/shared/services/loyalty-service/loyalty.service';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-adventure-client-reservation-dialog',
  templateUrl: './adventure-client-reservation-dialog.component.html',
  styleUrls: ['./adventure-client-reservation-dialog.component.css'],
})
export class AdventureClientReservationDialogComponent implements OnInit {
  @ViewChild('startDate') startDate: any;
  @ViewChild('endDate') endDate: any;

  form: any = this.createDatesForm();
  totalPrice: number = 0;
  loyaltyDiscount: any = 0;
  constructor(
    public dialogRef: MatDialogRef<AdventureClientReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private loyaltyService: LoyaltyService
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('startDate') !== '' &&
      localStorage.getItem('startDate') != null
    ) {
      this.form.controls['startDateVal'].setValue(
        this.convertStringToDate(
          this.convertDateStringToSlashes(localStorage.getItem('startDate'))
        )
      );

      this.form.controls['endDateVal'].setValue(
        this.convertStringToDate(
          this.convertDateStringToSlashes(localStorage.getItem('endDate'))
        )
      );
      this.setPrice();
    }
    this.form.controls['endDateVal'].valueChanges.subscribe((res: any) => {
      if (res !== null) this.setPrice();
    });
    this.loyaltyService.getLoyaltyForUser().subscribe((res) => {
      this.loyaltyDiscount = res;
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  setPrice() {
    let ret = 0;
    let startDateTest = new Date(
      this.form.controls['startDateVal'].value.getTime()
    );
    let endDateTest = new Date(
      this.form.controls['endDateVal'].value.getTime()
    );

    for (let d = startDateTest; d <= endDateTest; d.setDate(d.getDate() + 1)) {
      ret += this.data.pricePerDay;
    }
    this.totalPrice = ret - this.data.pricePerDay;
  }

  onConfirmClick() {
    if (!this.isRangeGood()) {
      this.messageService.showMessage(
        'Invalid date range!',
        MessageType.WARNING
      );
    } else {
      this.dialogRef.close({
        sendRequest: true,
        startDate: this.form.controls['startDateVal'].value,
        endDate: this.form.controls['endDateVal'].value,
        totalPrice: parseFloat(this.totalFee.toString()),
      });
    }
  }

  get totalFee() {
    return this.loyaltyDiscount * this.totalPrice;
  }

  createDatesForm(): FormGroup {
    return new FormGroup({
      startDateVal: new FormControl(''),
      endDateVal: new FormControl(''),
    });
  }

  convertStringToDate(dateStr: string) {
    let tokens = dateStr.split('/');
    let date = new Date();
    date.setDate(+tokens[1]);
    date.setMonth(+tokens[0] - 1);
    date.setFullYear(+tokens[2]);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  convertDateStringToSlashes(dateStr: any) {
    let tokens = dateStr.split('-');
    return tokens[1] + '/' + tokens[0] + '/' + tokens[2];
  }

  isRangeGood(): boolean {
    let startDateTest = this.form.controls['startDateVal'].value;
    if (startDateTest === '') return false;
    else
      startDateTest = new Date(
        this.form.controls['startDateVal'].value.getTime()
      );

    let endDateTest = this.form.controls['endDateVal'].value;
    if (endDateTest === '' || endDateTest === null) return false;
    else
      endDateTest = new Date(this.form.controls['endDateVal'].value.getTime());

    if (
      startDateTest.getDate() === endDateTest.getDate() &&
      startDateTest.getMonth() === endDateTest.getMonth() &&
      startDateTest.getFullYear() == endDateTest.getFullYear()
    )
      return false;

    let allGood = true;
    for (let d = startDateTest; d <= endDateTest; d.setDate(d.getDate() + 1)) {
      let inRange = false;
      for (let i = 0; i < this.data.dateRangeArray.length; i++) {
        let testDate2 = this.data.dateRangeArray[i][1];
        if (d >= this.data.dateRangeArray[i][0] && d <= testDate2) {
          inRange = true;
          break;
        }
      }
      if (!inRange) allGood = false;
    }
    return allGood;
  }

  getTotalFeeRequest() {
    let ret = 0;
    let startDateTest = new Date(
      this.form.controls['startDateVal'].value.getTime()
    );
    let endDateTest = new Date(
      this.form.controls['endDateVal'].value.getTime()
    );

    for (let d = startDateTest; d <= endDateTest; d.setDate(d.getDate() + 1)) {
      ret += this.data.pricePerDay;
    }
    return ret - this.data.pricePerDay;
  }

  get today() {
    return new Date();
  }
}
