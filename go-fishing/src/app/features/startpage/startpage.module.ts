import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpagePreviewListComponent } from './components/startpage-preview-list/startpage-preview-list.component';
import { StartpageLoginComponent } from './components/startpage-login/startpage-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartpageRegisterComponent } from './components/startpage-register/startpage-register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StartpagePreviewListComponent,
    StartpageLoginComponent,
    StartpageRegisterComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
})
export class StartpageModule {}
