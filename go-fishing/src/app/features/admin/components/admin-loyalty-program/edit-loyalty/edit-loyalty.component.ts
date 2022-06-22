import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoyaltyService } from 'src/app/shared/services/loyalty-service/loyalty.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

export interface DialogData {
  id: number
  rankName: string;
  minPoints: number;
  maxPoints: number;
  discountRate: number;
  pointsPerReservation: number;
}

@Component({
  selector: 'app-edit-loyalty',
  templateUrl: './edit-loyalty.component.html',
  styleUrls: ['./edit-loyalty.component.css']
})
export class EditLoyaltyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditLoyaltyComponent>,
              private loyaltyService: LoyaltyService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private messageService: MessageService) { }

  form: FormGroup = this.generateForm();
  
  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      rankName: new FormControl(''),
      minPoints: new FormControl(''),
      maxPoints: new FormControl(''),
      discountRate: new FormControl(''),
      pointsPerReservation: new FormControl('')
    });
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  edit() {
    if (this.form.valid) {
      this.loyaltyService.editLoyalty(this.form.getRawValue()).subscribe(res => {
        this.messageService.showMessage('Loyalty program uspešno izmenjen!', MessageType.SUCCESS);
        this.dialogRef.close(this.form.getRawValue());
      });
    }
    else {
      this.messageService.showMessage('Forma nije popunjena ispravno!', MessageType.WARNING);
    }

  }

}
