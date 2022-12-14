import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { enrollState } from 'app/enroll/enroll.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(enrollState)],
  declarations: [CreateUserComponent],
})
export class EnrollModule {}
