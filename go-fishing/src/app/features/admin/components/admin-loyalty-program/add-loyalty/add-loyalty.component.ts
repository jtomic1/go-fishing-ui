import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoyaltyService } from 'src/app/shared/services/loyalty-service/loyalty.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-add-loyalty',
  templateUrl: './add-loyalty.component.html',
  styleUrls: ['./add-loyalty.component.css']
})
export class AddLoyaltyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddLoyaltyComponent>,
              private loyaltyService: LoyaltyService,
              private messageService: MessageService) { }

  form: FormGroup = this.generateForm();

  ngOnInit(): void {
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
  
  add() {
    if (this.form.valid) {
      this.loyaltyService.addLoyalty(this.form.getRawValue()).subscribe(res => {
        this.messageService.showMessage('Loyalty program uspešno dodat!', MessageType.SUCCESS);
        this.dialogRef.close(this.form.getRawValue());
      });
    }
    else {
      this.messageService.showMessage('Forma nije popunjena ispravno!', MessageType.WARNING);
    }
  }

}
