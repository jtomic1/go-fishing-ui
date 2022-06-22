import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-add-admin',
  templateUrl: './admin-add-admin.component.html',
  styleUrls: ['./admin-add-admin.component.css']
})
export class AdminAddAdminComponent implements OnInit {

  adminId: number

  form: FormGroup = this.createRegistrationForm();

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));

    // this.form.get('password')?.valueChanges.subscribe(() => {
    //   this.activatePassMatchError =
    //     String(this.form.get('confirmPassword')!.value) !==
    //       String(this.form.get('password')!.value) &&
    //     String(this.form.get('confirmPassword')!.value) !== '';
    // });
    // this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
    //   this.activatePassMatchError =
    //     String(this.form.get('confirmPassword')!.value) !==
    //       String(this.form.get('password')!.value) &&
    //     String(this.form.get('confirmPassword')!.value) !== '';
    // });
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
      role: new FormControl('ROLE_ADMIN'),
    });
  }

  addAdmin() {
    if (this.form.invalid) {
      this.messageService.showMessage('Unesite podatke ispravno!', MessageType.WARNING);
    } else if ( String(this.form.get('password')!.value).length < 8 || String(this.form.get('password')!.value).length > 30 ) {
      this.messageService.showMessage('Broj karaktera lozinke mora biti veći od 8 i manji od 30!', MessageType.WARNING);
    } else if (String(this.form.get('password')!.value) !== String(this.form.get('confirmPassword')!.value)) {
      this.messageService.showMessage('Lozinke se ne poklapaju!', MessageType.WARNING);
    } else {
      if (this.form.valid) {
        this.adminService.addAdmin(this.form.getRawValue()).subscribe(res => {
          this.messageService.showMessage('Admin uspešno registrovan!', MessageType.SUCCESS);
          this.form.reset();
        })
      } 
    }
  }

}
