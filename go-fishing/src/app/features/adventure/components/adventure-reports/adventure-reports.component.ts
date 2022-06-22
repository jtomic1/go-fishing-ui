import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';
import { ReservationDTO } from 'src/models/reservation';
import { AdventureService } from '../../adventure.service';
import { Adventure } from '../../classes/adventure';

@Component({
  selector: 'app-adventure-reports',
  templateUrl: './adventure-reports.component.html',
  styleUrls: ['./adventure-reports.component.css']
})
export class AdventureReportsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  instructorId: number;
  adventures: Adventure[];
  adventureIds: number[];
  reservations: ReservationDTO[];

  ratingsTitle:string = 'Prosečne ocene';
  weekTitle: string = 'Ova nedelja';
  monthTitle: string = 'Ovaj mesec';
  yearTitle: string = 'Ova godina';
  x_axis:string;
  y_axis:string;
  ratingsData: any = [];
  dataForPieChart: any = [];
  yearData = [
    {name: 'Januar', value: 0},
    {name: 'Februar', value: 0},
    {name: 'Mart', value: 0},
    {name: 'April', value: 0},
    {name: 'Maj', value: 0},
    {name: 'Jun', value: 0},
    {name: 'Jul', value: 0},
    {name: 'Avgust', value: 0},
    {name: 'Septembar', value: 0},
    {name: 'Oktobar', value: 0},
    {name: 'Novembar', value: 0},
    {name: 'Decembar', value: 0}
  ];
  monthData = this.generateMonthData();
  weekData = this.generateWeekData();

  showRatings: boolean = false;
  displayPieChart: boolean = false;
  showWeek: boolean = false;
  showMonth: boolean = false;
  showYear: boolean = false;

  constructor(private route: ActivatedRoute,
              private adventureService: AdventureService,
              private reservationService: ReservationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));

    if(!isNaN(this.instructorId)){
      this.adventureService.getAdventuresOfInstructor(this.instructorId).subscribe(adventures => {
        this.adventures = adventures; 
        
        for (let ii = 0; ii < this.adventures.length; ii++) {          
          this.ratingsData.push({name: this.adventures[ii].name, value: this.adventures[ii].rating});
        }
        console.log(this.ratingsData);
        this.showRating();
      });
      this.reservationService.getReservationsForOwner(this.instructorId, "I").subscribe(data => {
        this.reservations = data;
        console.log(this.reservations);
      });
    }
  }

  showRating() {
    this.showRatings = true;
  }

  showIncomeInDateRange() {
    if (this.range.value.start !== null && this.range.value.end !== null) {
      this.dataForPieChart = [];
      let start_date = this.range.value.start.getFullYear()+"-"+this.getFullNumber(this.range.value.start.getMonth()+1)+"-"+this.getFullNumber(this.range.value.start.getDate());
      let end_date = this.range.value.end.getFullYear()+"-"+this.getFullNumber(this.range.value.end.getMonth()+1)+"-"+this.getFullNumber(this.range.value.end.getDate());
      this.reservations.forEach(reservation => {
        let reservation_start = reservation.startDate.year+"-"+this.getFullNumber(reservation.startDate.month)+"-"+this.getFullNumber(reservation.startDate.day);
        if (start_date <= reservation_start && reservation_start <= end_date) {
          this.dataForPieChart.push({name: this.getAdventureNameById(reservation.offerId), value: reservation.totalPrice});
        }
      });
      console.log(this.dataForPieChart);
      this.displayPieChart = true;
    }
    else {
      this.messageService.showMessage('Unesite opseg datuma!', MessageType.WARNING);
    }
  }

  getFullNumber(x:number):string{
    if(x<10)
      return "0"+x;
    return ""+x;
  }

  getAdventureNameById(id: number) {
   var adventure;
    this.adventures.forEach(a => {
      if (a.id === id) {
        adventure = a.name;
      }
    });
    return adventure;
  }

  showReservations() {
    var t = new Date();
    console.log(t);
    console.log(t.getFullYear());
    console.log(this.yearData[5]);
    /*
    this.reservations.forEach(reservation => {
      if (reservation.startDate.year === t.getFullYear()) {
        this.yearData[reservation.startDate.month-1].value += 1;
      }
      //this.showYear = true;
      if (reservation.startDate.month === t.getMonth()+1) {
        this.monthData[reservation.startDate.day-1].value += 1;
      }
      //this.showMonth = true;
      if(reservation.startDate.day >= t.getDay()-7 && reservation.startDate.day <= t.getDay() && (reservation.startDate.month === t.getMonth()+1)) {
        this.weekData[6-(t.getDay()-reservation.startDate.day)].value += 1;
      }
    });
    setTimeout(function(){
      console.log("P");
    }, 2000);
    this.showYear = true;
    this.showMonth = true;
    this.showWeek = true;
    */
    var bar = new Promise<void>((resolve, reject) => {
      this.reservations.forEach(reservation => {
        if (reservation.startDate.year === t.getFullYear()) {
          this.yearData[reservation.startDate.month-1].value += 1;
        }
        //this.showYear = true;
        if (reservation.startDate.month === t.getMonth()+1) {
          this.monthData[reservation.startDate.day-1].value += 1;
        }
        //this.showMonth = true;
        if(reservation.startDate.day >= t.getDay()-7 && reservation.startDate.day <= t.getDay() && (reservation.startDate.month === t.getMonth()+1)) {
          this.weekData[6-(t.getDay()-reservation.startDate.day)].value += 1;
        }
      });
      resolve();
    });
  
    bar.then(() => {
      this.showYear = true;
      this.showMonth = true;
      this.showWeek = true;
    });


  }
  

  generateMonthData() : any {
    var retVal = [];
    for (let ii = 0; ii < 31; ii++) {
      retVal.push({name: (ii+1).toString(), value: 0});
    }
    return retVal;
  }

  generateWeekData(): any {
    var retVal = [];
    for (let ii = 0; ii < 7; ii++) {
      retVal.push({name: (ii+1).toString(), value: 0});
    }
    return retVal
  }
}
