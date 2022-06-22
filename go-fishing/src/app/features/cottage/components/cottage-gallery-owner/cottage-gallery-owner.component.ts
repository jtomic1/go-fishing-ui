import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Cottage } from 'src/models/cottage';
import { CottageService } from '../../services/cottage.service';

@Component({
  selector: 'app-cottage-gallery-owner',
  templateUrl: './cottage-gallery-owner.component.html',
  styleUrls: ['./cottage-gallery-owner.component.css']
})
export class CottageGalleryOwnerComponent implements OnInit {

  @Input() ownerId:number;

  cottages:Cottage[];

  constructor(private cottageService:CottageService,private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    
      this.cottageService.findCottagesByOwner(this.ownerId).subscribe(data =>{
        this.cottages = data;
      });
    
    
  }

  deleteCottage(cottageId:number)
  {
    if(confirm("Da li ste sigurni da zelite da izbrisete vikendicu "+cottageId+"?")){
      
      this.cottageService.deleteCottage(cottageId).subscribe(
        deleted =>{
          if(deleted){
            this.messageService.showMessage("Uspešno ste obrisali vikendicu",MessageType.SUCCESS);
          
            this.cottages.splice(this.cottages.findIndex(cottage => cottage.id === cottageId),1);
          }
          else
            this.messageService.showMessage("Nismo uspeli da obrišemo vikendicu",MessageType.ERROR);
        
        },
        err=>{
          this.messageService.showMessage("Niste u mogućnosti da obrišete vikendicu.",MessageType.ERROR);  
        }
      )
    }
  }
  

  addNewCottage(){
    this.router.navigateByUrl("/addNewCottage",{state:{ownerId: this.ownerId,cottages:this.cottages}});
  }

  
}
