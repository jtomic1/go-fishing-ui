import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Cottage } from 'src/models/cottage';
import { CottageService } from '../../services/cottage.service';

@Component({
  selector: 'app-cottage-edit',
  templateUrl: './cottage-edit.component.html',
  styleUrls: ['./cottage-edit.component.css']
})
export class CottageEditComponent implements OnInit {
  
  cottageId:number;
  currentCottage:Cottage;

  newCottage: Cottage= new Cottage();
  name :string;
  price:number;
  capacity:number;
  promoDescription : string;
  bedCount:number;
  roomCount:number;

  constructor(private cottageService:CottageService,
    private route: ActivatedRoute,
    private router:Router,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.cottageId = Number(this.route.snapshot.paramMap.get('id'));
    this.cottageService.findCottageById(this.cottageId).subscribe(data=>{
      this.currentCottage = data;
      console.log(this.currentCottage);
      this.name = this.currentCottage.name;
      this.price = this.currentCottage.price;
      this.capacity = this.currentCottage.capacity;
      this.promoDescription = this.currentCottage.description;
      this.bedCount = this.currentCottage.bedCount;
      this.roomCount = this.currentCottage.roomCount;
    })
  }

  editCottage() {

    if(this.price < 10 ){
            this.messageService.showMessage("Unesite neku normalnu cenu",MessageType.ERROR);
    }

    this.newCottage.name = this.name;
    this.newCottage.price = this.price;
    this.newCottage.capacity = this.capacity;
    this.newCottage.description = this.promoDescription;
    this.newCottage.bedCount = this.bedCount;
    this.newCottage.id = this.cottageId;
    this.newCottage.roomCount = this.roomCount;

    //console.log(this.newCottage);
    
    this.cottageService.editCottage(this.newCottage).subscribe(response => {
      this.messageService.showMessage("Uspešno ste izmenili vikendicu",MessageType.SUCCESS);
      },
      err =>{
        this.messageService.showMessage("Niste u mogućnosti da izmenite vikendicu.",MessageType.ERROR);
      },
    );
    this.router.navigateByUrl("/cottageProfile/"+this.cottageId);

  }
}
