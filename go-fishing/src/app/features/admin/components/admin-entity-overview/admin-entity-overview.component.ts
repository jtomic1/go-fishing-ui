import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/classes/user';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Boat } from 'src/models/boat';
import { Cottage } from 'src/models/cottage';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-entity-overview',
  templateUrl: './admin-entity-overview.component.html',
  styleUrls: ['./admin-entity-overview.component.css']
})
export class AdminEntityOverviewComponent implements OnInit {
  //allItems: any[] = [];
  //pageSlice: any[] = [];
  pageSize: number = 2;
  pageSizeOptions: number[] = [this.pageSize];

  adminId: number;

  boats: Boat[] = [];
  boatSlice: Boat[] = [];

  cottages: Cottage[] = [];
  cottageSlice: Cottage[] = [];

  clients: User[] = [];
  clientSlice: User[] = [];

  instructors: User[] = [];
  instructorSlice: User[] = [];

  cottageOwners: User[] = [];
  cottageOwnerSlice: User[] = [];

  boatOwners: User[] = [];
  boatOwnerSlice: User[] = [];

  userBeingDeleted: number = -1;
  userEntity: string;
  cottageBeingDeleted: number = -1;
  boatBeingDeleted: number = -1;

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getBoats().subscribe(data => {
      this.boats = data;
      this.boatSlice = this.boats.slice(0, this.pageSize);      
    });
    this.adminService.getCottages().subscribe(data => {
      this.cottages = data;
      this.cottageSlice = this.cottages.slice(0, this.pageSize);
    });
    this.adminService.getInstructors().subscribe(data => {
      this.instructors = data;
      this.instructorSlice = this.instructors.slice(0, this.pageSize);
    });
    this.adminService.getBoatOwners().subscribe(data => {
      this.boatOwners = data;
      this.boatOwnerSlice = this.boatOwners.slice(0, this.pageSize);
    });
    this.adminService.getCottageOwners().subscribe(data => {
      this.cottageOwners = data;
      this.cottageOwnerSlice = this.cottageOwners.slice(0, this.pageSize);
    });
    this.adminService.getClients().subscribe(data => {
      this.clients = data;
      this.clientSlice = this.clients.slice(0, this.pageSize);
    });
  }

  onPageChangeBoats(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.boats.length) endIndex = this.boats.length;
    this.boatSlice = this.boats.slice(startIndex, endIndex);
  }

  onPageChangeCottages(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.cottages.length) endIndex = this.cottages.length;
    this.cottageSlice = this.cottages.slice(startIndex, endIndex);
  }

  onPageChangeInstructors(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.instructors.length) endIndex = this.instructors.length;
    this.instructorSlice = this.instructors.slice(startIndex, endIndex);
  }

  onPageChangeBoatOwners(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.boatOwners.length) endIndex = this.boatOwners.length;
    this.boatOwnerSlice = this.boatOwners.slice(startIndex, endIndex);
  }

  onPageChangeCottageOwners(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.cottageOwners.length) endIndex = this.cottageOwners.length;
    this.cottageOwnerSlice = this.cottageOwners.slice(startIndex, endIndex);
  }

  onPageChangeClients(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.clients.length) endIndex = this.clients.length;
    this.clientSlice = this.clients.slice(startIndex, endIndex);
  }

  UserBeingDeleted(id: number, entity: string) {
    this.userBeingDeleted = id;
    this.userEntity = entity;
  }

  BoatBeingDeleted(id: number) {
    this.boatBeingDeleted = id;
  }

  CottageBeingDeleted(id: number) {
    this.cottageBeingDeleted = id;
  }

  Delete() {
    if (this.userBeingDeleted !== -1) {
      this.DeleteUser();
    } else if (this.boatBeingDeleted !== -1) {
      this.DeleteBoat();
    } else if (this.cottageBeingDeleted !== -1) {
      this.DeleteCottage();
    }
  }

  DeleteUser() {
    this.adminService.deleteUserEntity(this.userBeingDeleted).subscribe(res => {
      this.messageService.showMessage("Korisnik uspešno obrisan!", MessageType.SUCCESS);
      if (this.userEntity === 'client') {
        this.clients.forEach((element, index) => {if(element.id === this.userBeingDeleted) this.clients.splice(index, 1)});
        this.clientSlice = this.clients.slice(0, this.pageSize);
      } else if (this.userEntity === 'cottageOwner') {
        this.cottageOwners.forEach((element, index) => {if(element.id === this.userBeingDeleted) this.cottageOwners.splice(index, 1)});
        this.cottageOwnerSlice = this.cottageOwners.slice(0, this.pageSize);
      } else if (this.userEntity === 'boatOwner'){
        this.boatOwners.forEach((element, index) => {if(element.id === this.userBeingDeleted) this.boatOwners.splice(index, 1)});
        this.boatOwnerSlice = this.boatOwners.slice(0, this.pageSize);
      } else {
        this.instructors.forEach((element, index) => {if(element.id === this.userBeingDeleted) this.instructors.splice(index, 1)});
        this.instructorSlice = this.instructors.slice(0, this.pageSize);
      }
      this.userBeingDeleted = -1;
    });
  }

  DeleteCottage() {
    this.adminService.deleteCottage(this.cottageBeingDeleted).subscribe(res => {
      this.messageService.showMessage("Vikendica uspešno obrisana!", MessageType.SUCCESS);
      this.cottages.forEach((element, index) => {if(element.id === this.cottageBeingDeleted) this.cottages.splice(index, 1)});
      this.cottageSlice = this.cottages.slice(0, this.pageSize);
      this.cottageBeingDeleted = -1;
    });
  }

  DeleteBoat() {
    this.adminService.deleteBoat(this.boatBeingDeleted).subscribe(res => {
      this.messageService.showMessage("Brod uspešno obrisana!", MessageType.SUCCESS);
      this.boats.forEach((element, index) => {if(element.id === this.boatBeingDeleted) this.boats.splice(index, 1)});      
      this.boatSlice = this.boats.slice(0, this.pageSize);
      this.boatBeingDeleted = -1;
    });
  }

}
