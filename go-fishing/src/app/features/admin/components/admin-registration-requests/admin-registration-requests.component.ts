import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AdminService } from '../../admin.service';
import { RegistrationRequest } from '../../classes/RegistrationRequest';

@Component({
  selector: 'app-admin-registration-requests',
  templateUrl: './admin-registration-requests.component.html',
  styleUrls: ['./admin-registration-requests.component.css']
})
export class AdminRegistrationRequestsComponent implements OnInit {

  adminId: number;
  beingRefused: number = -1;
  registrationRequests: RegistrationRequest[] = [];

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getRegistrationRequests().subscribe( data => {
      this.registrationRequests = data;
      console.log(this.registrationRequests);
    });
  }

  RequestBeingRefused(id: string) {
    this.beingRefused = parseInt(id);
  }

  RefuseRequest() {
    var reasonInput = document.getElementById('reason') as HTMLInputElement;
    this.adminService.refuseRegistration(this.beingRefused, reasonInput.value).subscribe(data => {
      this.messageService.showMessage('Zahtev za registraciju odbijen!', MessageType.SUCCESS);
      this.registrationRequests.forEach((element, index) => {if(element.userId === this.beingRefused.toString()) this.registrationRequests.splice(index, 1)});
      if (!this.registrationRequests) {
        console.log('sds')
        this.registrationRequests = [];
      }
    });
  }

  AcceptRequest(id: string) {    
    this.adminService.registerUser(parseInt(id)).subscribe(data => {
      this.messageService.showMessage('Zahtev za registraciju prihvaćen!', MessageType.SUCCESS);
      this.registrationRequests.forEach((element, index) => {if(element.userId === id) this.registrationRequests.splice(index, 1)});
    });
  }

}
