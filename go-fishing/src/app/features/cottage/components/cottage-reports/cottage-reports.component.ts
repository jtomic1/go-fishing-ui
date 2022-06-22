import { Component, Input, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';

@Component({
  selector: 'app-cottage-reports',
  templateUrl: './cottage-reports.component.html',
  styleUrls: ['./cottage-reports.component.css']
})
export class CottageReportsComponent implements OnInit {

  constructor(private reservationService:ReservationService) { }

  dataForChar:any=[];

  title:string;
  x_axis:string;
  y_axis:string;

  displayChartPie:boolean = false;
  displayChart:boolean = true;

  @Input() ownerId:number;
  
  ngOnInit(): void {
    this.displayCottagesBussy();
  }

  displayCottagesBussy(){

    this.displayChart = true;
    this.displayChartPie= false;

    this.title = "Zauzetost vikendica";
    this.reservationService.getVisitChartDataForReservations(this.ownerId,'C').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }


  displayCottagesIncome(){
    this.displayChart = false;
    this.displayChartPie= true;


    this.title = "Prihodi od vikendica";
    this.reservationService.getProfitChartDataForReservations(this.ownerId,'C').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }

  displayCottagesGrades(){

    this.displayChart = true;
    this.displayChartPie= false;


    this.title = "Prosecne ocene vikendica";
    
    this.reservationService.getGradeChartDataForReservations(this.ownerId,'C').subscribe(
      data =>{
        this.dataForChar = data;
      }
    );
  }

}
