import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfilpageComponent } from './components/admin-profilpage/admin-profilpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRegistrationRequestsComponent } from './components/admin-registration-requests/admin-registration-requests.component';
import { AdminDeletionRequestsComponent } from './components/admin-deletion-requests/admin-deletion-requests.component';
import { AdminAddAdminComponent } from './components/admin-add-admin/admin-add-admin.component';
import { AdminService } from './admin.service';
import { AdminEntityOverviewComponent } from './components/admin-entity-overview/admin-entity-overview.component';
import { AdminReportComponent } from './components/admin-report/admin-report.component';
import { AdminComplaintsComponent } from './components/admin-complaints/admin-complaints.component';
import { AdminComplaintComponent } from './components/admin-complaints/admin-complaint/admin-complaint.component';
import { AdminLoyaltyProgramComponent } from './components/admin-loyalty-program/admin-loyalty-program.component';
import { EditLoyaltyComponent } from './components/admin-loyalty-program/edit-loyalty/edit-loyalty.component';
import { AddLoyaltyComponent } from './components/admin-loyalty-program/add-loyalty/add-loyalty.component';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';



@NgModule({
  declarations: [
    AdminProfilpageComponent,
    AdminRegistrationRequestsComponent,
    AdminDeletionRequestsComponent,
    AdminAddAdminComponent,
    AdminEntityOverviewComponent,
    AdminReportComponent,
    AdminComplaintsComponent,
    AdminComplaintComponent,
    AdminLoyaltyProgramComponent,
    EditLoyaltyComponent,
    AddLoyaltyComponent,
    AdminReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [AdminService]
})
export class AdminModule { }
