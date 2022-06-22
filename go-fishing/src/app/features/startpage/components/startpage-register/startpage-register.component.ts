import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { StartpageRegisterService } from './startpage-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage-register',
  templateUrl: './startpage-register.component.html',
  styleUrls: ['./startpage-register.component.css'],
})
export class StartpageRegisterComponent implements OnInit {
  form: FormGroup = this.createRegistrationForm();

  activatePassMatchError = false;

  constructor(
    private registrationService: StartpageRegisterService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('jwt') !== null) {
      this.router.navigateByUrl('');
    }
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.activatePassMatchError =
        String(this.form.get('confirmPassword')!.value) !==
          String(this.form.get('password')!.value) &&
        String(this.form.get('confirmPassword')!.value) !== '';
    });
    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.activatePassMatchError =
        String(this.form.get('confirmPassword')!.value) !==
          String(this.form.get('password')!.value) &&
        String(this.form.get('confirmPassword')!.value) !== '';
    });
    this.form.get('role')?.valueChanges.subscribe((res: any) => {
      if (res === 'ROLE_USER') this.form.get('reason')?.clearValidators();
      else this.form.get('reason')?.addValidators(Validators.required);
      this.form.get('reason')?.updateValueAndValidity();
    });
  }

  createRegistrationForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(
        '',
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
      role: new FormControl('ROLE_USER'),
      reason: new FormControl(''),
    });
  }

  get showRegistrationReason(): boolean {
    let role = this.form.controls['role'].value;
    return role !== 'ROLE_USER';
  }

  saveRequest(): void {
    if (this.form.invalid || this.activatePassMatchError) {
      this.messageService.showMessage(
        'Please fill out the form correctly!',
        MessageType.WARNING
      );
    } else {
      this.registrationService
        .sendRegistrationRequest(this.form.getRawValue())
        .pipe()
        .subscribe(
          (res) => {
            let msgString;
            if (this.form.controls['role'].value === 'ROLE_USER')
              msgString = 'Success! A confirmation e-mail has been sent!';
            else
              msgString =
                'Success! An admin will review your applicaton shortly!';
            this.messageService.showMessage(msgString, MessageType.SUCCESS);
            this.router.navigate(['/login']);
          },
          (error) => {
            this.messageService.showMessage(error, MessageType.ERROR);
          }
        );
    }
  }
}
