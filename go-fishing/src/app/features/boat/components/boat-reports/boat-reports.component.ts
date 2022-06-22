import { Component, Input, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';

@Component({
  selector: 'app-boat-reports',
  templateUrl: './boat-reports.component.html',
  styleUrls: ['./boat-reports.component.css']
})
export class BoatReportsComponent implements OnInit {

  @Input() ownerId:number;

  constructor(private reservationService:ReservationService) { }

  dataForChar:any=[
    { name: "Vikendica Kosmaj", value: 100 },
    { name: "Vila Raj", value: 55 },
    { name: "Selo Tur", value: 150 },
    { name: "Vrhpolje", value: 500 },
    { name: "Rocevic", value: 200 }
  ];

  title:string;
  x_axis:string;
  y_axis:string;

  displayChartPie:boolean = false;
  displayChart:boolean = true;
  
  ngOnInit(): void {
    this.displayCottagesBussy();
  }


  displayCottagesBussy(){

    this.displayChart = true;
    this.displayChartPie= false;

    this.title = "Zauzetost brodova";
    this.reservationService.getVisitChartDataForReservations(this.ownerId,'B').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }


  displayCottagesIncome(){
    this.displayChart = false;
    this.displayChartPie= true;


    this.title = "Prihodi od brodova";
    this.reservationService.getProfitChartDataForReservations(this.ownerId,'B').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }

  displayCottagesGrades(){

    this.displayChart = true;
    this.displayChartPie= false;


    this.title = "Prosecne ocene ";
    this.reservationService.getGradeChartDataForReservations(this.ownerId,'B').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }

}
