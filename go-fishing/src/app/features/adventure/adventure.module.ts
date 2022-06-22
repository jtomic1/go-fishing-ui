import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdventureProfilpageComponent } from './components/adventure-profilpage/adventure-profilpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdventureCardComponent } from './components/adventure-card/adventure-card.component';
import { AdventureInstructorpageComponent } from './components/adventure-instructorpage/adventure-instructorpage.component';
import { AdventureService } from './adventure.service';
import { AdventureAddNewComponent } from './components/adventure-add-new/adventure-add-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdventureInstructorEditComponent } from './components/adventure-instructor-edit/adventure-instructor-edit.component';
import { RouterModule } from '@angular/router';
import { AdventureEditComponent } from './components/adventure-edit/adventure-edit.component';
import { AdventureFreePeriodComponent } from './components/adventure-free-period/adventure-free-period.component';
import { AdventureInstructorCalendarComponent } from './components/adventure-instructor-calendar/adventure-instructor-calendar.component';
import { AdventureActionComponent } from './components/adventure-action/adventure-action.component';
import { AdventureReportsComponent } from './components/adventure-reports/adventure-reports.component';
import { AdventureClientReservationDialogComponent } from './components/adventure-client-reservation-dialog/adventure-client-reservation-dialog.component';
import { AdventureReservationsComponent } from './components/adventure-reservations/adventure-reservations.component';

@NgModule({
  declarations: [
    AdventureProfilpageComponent,
    AdventureCardComponent,
    AdventureInstructorpageComponent,
    AdventureAddNewComponent,
    AdventureInstructorEditComponent,
    AdventureEditComponent,
    AdventureFreePeriodComponent,
    AdventureInstructorCalendarComponent,
    AdventureActionComponent,
    AdventureReportsComponent,
    AdventureClientReservationDialogComponent,
    AdventureReservationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [AdventureService],
})
export class AdventureModule {}
