import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageServiceService } from 'src/app/shared/services/image-service/image-service.service';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { PasswordChangeDialog } from './change-password-dialog/password-change-dialog.component';
import { DeletionRequestDialogComponent } from './deletion-request-dialog/deletion-request-dialog.component';
import { LoyaltyDialogComponent } from './loyalty-dialog/loyalty-dialog.component';
import { UserprofileService } from './userprofile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  oldForm: FormGroup = this.createProfileForm();
  form: FormGroup = this.createProfileForm();
  updatePasswordForm: FormGroup = this.createUpdatePasswordForm();
  deletionForm: FormGroup = this.createDeletionForm();

  loyalty: any = { loyaltyPoints: 0, currentRank: '' };
  penaltyCount: number = -1;
  constructor(
    private profileService: UserprofileService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private imageService: ImageServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('jwt') === null
    ) {
      this.router.navigateByUrl('');
    }
    this.getUserData().subscribe(
      (res: any) => {
        this.oldForm.patchValue(res);
        this.form.patchValue(res);
      },
      (err: any) => {
        console.log(err);
        console.log('GRESKA');
      }
    );

    this.getLoyaltyPoints().subscribe((res: any) => {
      this.loyalty = res;
    });

    if (localStorage.getItem('user-role') === 'ROLE_USER') {
      this.getPenaltyCount().subscribe((res: any) => {
        this.penaltyCount = res;
      });
    }
  }

  createProfileForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(
        { value: '', disabled: true },
        Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(8), Validators.maxLength(30)])
      ),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      lastName: new FormControl(''),
      country: new FormControl(''),
      town: new FormControl(''),
      address: new FormControl(''),
      phoneNumber: new FormControl('', Validators.pattern('^[+][0-9]{10,12}$')),
    });
  }

  createUpdatePasswordForm(): FormGroup {
    return new FormGroup({
      newPassword: new FormControl({ value: '' }, Validators.required),
      confirmNewPassword: new FormControl({ value: '' }, Validators.required),
    });
  }

  createDeletionForm(): FormGroup {
    return new FormGroup({
      deletionReason: new FormControl({ value: '' }, Validators.required),
    });
  }

  getUserData() {
    return this.profileService.getUserData();
  }

  getLoyaltyPoints() {
    return this.profileService.getLoyaltyPoints();
  }

  getPenaltyCount() {
    return this.profileService.getPenaltyCount();
  }

  updateProfileInfo() {
    let status: string = this.profileService.validateNewUserData(
      this.form.getRawValue()
    );

    if (status !== 'OK') {
      this.messageService.showMessage(status, MessageType.WARNING);
      return;
    } else {
      this.oldForm.setValue(this.form.getRawValue());
      return this.profileService
        .updateProfileInfo(this.form.getRawValue())
        .pipe()
        .subscribe((res: any) => {
          this.messageService.showMessage(
            'Profile updated sucessfully!',
            MessageType.SUCCESS
          );
        }, (error) => {
          this.messageService.showMessage('Error has occured!', MessageType.ERROR);
        });

    }

  }

  changePasswordDialog() {
    this.updatePasswordForm.get('newPassword')?.setValue('');
    this.updatePasswordForm.get('confirmNewPassword')?.setValue('');
    this.dialog.open(PasswordChangeDialog, {
      data: this.updatePasswordForm,
    });
  }

  loyaltyDialog() {
    this.dialog.open(LoyaltyDialogComponent);
  }

  deletionRequestDialog() {
    this.deletionForm.get('deletionReason')?.setValue('');
    this.dialog.open(DeletionRequestDialogComponent, {
      data: this.deletionForm,
    });
  }

  get loyaltyBadge() {
    return this.imageService.loyaltyBadge;
  }

  get updateButtonDisabled(): boolean {
    return (
      JSON.stringify(this.oldForm.getRawValue()) ===
      JSON.stringify(this.form.getRawValue())
    );
  }
}
