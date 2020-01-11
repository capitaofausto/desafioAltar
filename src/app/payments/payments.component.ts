import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { ReplaySubject } from 'rxjs';
import { PaymentInterface, Payment } from '../core/models/Payment';
import { CodeInterface, Code } from '../core/models/Code';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  private payments$ = new ReplaySubject<PaymentInterface[]>();
  public payments : Payment[] = [];
  public currentCode: CodeInterface;
  private currentCode$ = new ReplaySubject<CodeInterface>();
  showCode = false;
  paymentForm: FormGroup;
  cols = [0,1,2,3,4,5,6,7,8,9];


  constructor(private dataService:DataService, private formBuilder: FormBuilder) {
    this.paymentForm = this.formBuilder.group({
      name: new FormControl(''),
      amount: new FormControl(0)
    });
    this.payments$ = this.dataService.payments$;
    this.payments$.subscribe( (data:Payment[]) => {
      this.payments = [...data];
      console.log(this.payments);

    })
    this.currentCode$ = this.dataService.currentCode$;
    this.currentCode$.subscribe( (code:Code) => {
      this.showCode = true;
      this.currentCode = code;
    })
  }

  ngOnInit() {
    this.currentCode = this.dataService.getCode();
    this.payments = this.dataService.getPayments();
  }

  onSubmit() {
    console.log(this.paymentForm.value);
    const payment = new Payment({...this.paymentForm.value, code:this.currentCode});
    this.dataService.savePayment(payment);
  }

}
