import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
