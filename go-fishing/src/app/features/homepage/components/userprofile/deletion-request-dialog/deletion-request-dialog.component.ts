import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { UserprofileService } from '../userprofile.service';

@Component({
  selector: 'app-deletion-request-dialog',
  templateUrl: './deletion-request-dialog.component.html',
  styleUrls: ['./deletion-request-dialog.component.css'],
})
export class DeletionRequestDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletionRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    private messageService: MessageService,
    private profileService: UserprofileService
  ) {}

  ngOnInit(): void {}

  onSendRequest() {
    let status: string = this.profileService.validateDeletionRequest(
      this.data.getRawValue()
    );

    if (status !== 'OK') {
      this.messageService.showMessage(status, MessageType.WARNING);
      return;
    } else {
      this.profileService
        .sendDeletionRequest(this.data.getRawValue())
        .pipe()
        .subscribe((res: any) => {
          this.dialogRef.close();
          this.messageService.showMessage(
            'Request sent sucessfully',
            MessageType.SUCCESS
          );
        });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
