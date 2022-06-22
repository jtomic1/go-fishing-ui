import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { UserprofileService } from '../userprofile.service';

@Component({
  selector: 'password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css'],
})
export class PasswordChangeDialog {
  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private messageService: MessageService,
    private profileService: UserprofileService
  ) {}

  onCancelClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    let status: string = this.profileService.validateNewPassword(
      this.data.getRawValue()
    );

    if (status !== 'OK') {
      this.messageService.showMessage(status, MessageType.WARNING);
      return;
    } else {
      return this.profileService
        .changePassword(this.data.getRawValue())
        .pipe()
        .subscribe((res: any) => {
          this.dialogRef.close();
          this.messageService.showMessage(
            'Password updated sucessfully!',
            MessageType.SUCCESS
          );
        });
    }
  }
}
