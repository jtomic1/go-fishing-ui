import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MessageComponent } from './services/message-service/message.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewFreePeriodComponent } from './components/new-free-period/new-free-period.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendarPage/calendar.component';
import { DemoModule } from './components/MyCalendar/demo/module';
import { DemoComponent } from './components/MyCalendar/demo/component';
import { OfferInfoComponent } from './components/offer-info/offer-info.component';
import { NewActionComponent } from './components/new-action/new-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './components/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartPieComponent } from './components/calendar/chart-pie/chart-pie.component';
import { ReservationListView } from './components/reservations/reservations-list-view/reservations-list-view.component';
import { ReservationsOwnerpageComponent } from './components/reservations/reservations-ownerpage/reservations-ownerpage.component';
import { ReservationEndReportComponent } from './components/reservations/reservation-end-report/reservation-end-report.component';
import { ReservationAddNewWithClientComponent } from './components/reservations/reservation-add-new-with-clent/reservation-add-new-with-client.component';
import { NoEntitiesFoundComponent } from './components/no-entities-found/no-entities-found.component';
import { ReservationCardComponent } from './components/reservations/reservation-card/reservation-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    EditProfileComponent,
    MessageComponent,
    NewFreePeriodComponent,
    CalendarComponent,
    OfferInfoComponent,
    NewActionComponent,
    SidebarComponent,
    ChartComponent,
    ChartPieComponent,
    ReservationListView,
    ReservationsOwnerpageComponent,
    ReservationEndReportComponent,
    ReservationAddNewWithClientComponent,
    NoEntitiesFoundComponent,
    ReservationCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FontAwesomeModule,
    NgbModule,
    DemoModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    MaterialModule,
    EditProfileComponent,
    DemoComponent,
    OfferInfoComponent,
    SidebarComponent,
    ChartComponent,
    ChartPieComponent,
    ReservationsOwnerpageComponent,
    NoEntitiesFoundComponent,
    ReservationListView
  ],
})
export class SharedModule {}
