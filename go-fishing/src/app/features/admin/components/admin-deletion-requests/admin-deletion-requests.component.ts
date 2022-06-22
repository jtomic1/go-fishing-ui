import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AdminService } from '../../admin.service';
import { DeletionRequest } from '../../classes/DeletionRequest';

@Component({
  selector: 'app-admin-deletion-requests',
  templateUrl: './admin-deletion-requests.component.html',
  styleUrls: ['./admin-deletion-requests.component.css']
})
export class AdminDeletionRequestsComponent implements OnInit {

  adminId: number;
  beingRefused: number = -1;
  deletionRequests: DeletionRequest[] = [];

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getDeletionRequests().subscribe( data => {
      this.deletionRequests = data;
      console.log(this.deletionRequests);
    });
  }

  RequestBeingRefused(id: string) {
    this.beingRefused = parseInt(id);    
  }

  RefuseRequest() {    
    var reasonInput = document.getElementById('reason') as HTMLInputElement;
    this.adminService.refuseDeletion(this.beingRefused, reasonInput.value).subscribe(data => {
      this.messageService.showMessage('Zahtev za brisanje naloga odbijen!', MessageType.SUCCESS);
      this.deletionRequests.forEach((element, index) => {if(element.userId === this.beingRefused.toString()) this.deletionRequests.splice(index, 1)});
      if (!this.deletionRequests) {
        console.log('aaaaa');
        this.deletionRequests = [];
      }
    });    
  }

  AcceptRequest(id: string) {        
    this.adminService.deleteUser(parseInt(id)).subscribe(data => {
      this.messageService.showMessage('Zahtev za  brisanje naloga prihvaćen!', MessageType.SUCCESS);
      this.deletionRequests.forEach((element, index) => {if(element.userId === id) this.deletionRequests.splice(index, 1)});
    });
  }

}
