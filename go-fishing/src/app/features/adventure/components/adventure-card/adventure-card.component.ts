import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';


@Component({
  selector: 'app-adventure-card',
  templateUrl: './adventure-card.component.html',
  styleUrls: ['./adventure-card.component.css']
})
export class AdventureCardComponent implements OnInit {

  adventure = new Adventure({
    id: 0,
	  name: '',
	  promoDescription: '',
	  price: 0,
	  capacity: 0,

	  equipment: '',
	  rulesOfConduct: '',
	  rulesOfCancelation: '',
	  moreInfo: '',

	  street: '',
	  city: '',
	  country: '',
	  latitude: '',
	  longitude: '',

	  instructorId: 0,
	  instructorBiography: '',
	  instructorName: '',
	  instructorSurname: '',
    deleted: false,
    rating: 0
  });
  
  @Input('adventureId')
  adventureId!: string;
 
  isInstructor: boolean = true;
  
  deleteSuccess!: string;

  @Output() OnAdventureDeleted: EventEmitter<string> = new EventEmitter();

  images =  ["https://i.imgur.com/JJjNarK.jpeg", "https://i.imgur.com/4Kcv4Ha.jpeg", "https://i.imgur.com/AM3wZt7.jpeg", "https://i.imgur.com/yGw6TI2.jpeg"]

  constructor(private adventureService: AdventureService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.adventureService.getAdventureById(Number(this.adventureId)).subscribe(adventure => {
      this.adventure = adventure;
      console.log(adventure);
    })

    /*var adventure1 = {
      id: this.id,
      instructor: this.instructorName,
      name: this.name,
      price: this.price,
      latitude: 44.374229,
      longitude: 19.105961,
      address: "Mali Zvornik, Srbija",
      promoDescription: "Nezaboravno iskustvo na Drini! Iskusite sve čari drinskog ribolova. Neopisiva lepota jedne od najbržih evropskih reka će vas ostavitit bez daha. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde natus, sunt sed maxime ut accusamus dignissimos veniam inventore debitis consequatur temporibus odio facere nobis, tenetur deserunt aut fugit distinctio recusandae.",
      instructorBio: "Mika Mikić je iskusni ribolovac, gnjurac i plivač. Diplomirao je na fakultetu za sport i rekreaciju na Palama sa prosekom 9,56. Ovim poslom se bavi već 10 godina. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde natus, sunt sed maxime ut accusamus dignissimos veniam inventore debitis consequatur temporibus odio facere nobis, tenetur deserunt aut fugit distinctio recusandae.",
      images: ["https://i.imgur.com/JJjNarK.jpeg", "https://i.imgur.com/4Kcv4Ha.jpeg", "https://i.imgur.com/AM3wZt7.jpeg", "https://i.imgur.com/yGw6TI2.jpeg"],
      maxNumOfPeople: 10,
      rulesOfConduct: ["Nije dozvoljeno ostavljati smeće na plažama i u reci", "Nije dozvoljenu ulaziti u vodu bez dopuštanja instruktora", "Nije dozvoljeno pušenje"],
      equipment: ["Stapovi za pecanje", "Mreže", "Svi tipovi mamaca i varalica", "Kombinezoni"],
      information: "Avantura se održava dva puta dnevno. Prvi termin je u 9h, a drugi u 15h. Mesto okupljanja je gradska plaža. Avantura traje dva sata.",
      cancellation: "U slučaju otkazivanja instruktor zadržava 30% uplaćene sume.",
    };*/
  }

  deleteAdventure() {
    this.adventureService.deleteAdventure(this.adventure.id).subscribe(adventure =>
      {
        console.log(adventure);
        this.messageService.showMessage("Avantura uspešno obrisana!", MessageType.SUCCESS);        
        this.OnAdventureDeleted.emit(this.adventureId);
      },
      error => {
        this.messageService.showMessage("Avantura ima aktivne rezervacije!", MessageType.ERROR);
      });
  }

}
