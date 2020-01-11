import { Injectable } from '@angular/core';
import { PaymentInterface, Payment } from '../models/Payment';
import { ReplaySubject } from 'rxjs';
import { CodeInterface, Code } from '../models/Code';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private payments: PaymentInterface[] = [];
  public payments$ = new ReplaySubject<PaymentInterface[]>();

  private currentCode: CodeInterface;
  public currentCode$ = new ReplaySubject<CodeInterface>();

  constructor() {
    this.currentCode$.subscribe( data => {
      this.currentCode = data;
    })
    this.payments$.subscribe( payment => {
      this.payments = payment;
    })
  }

  public saveCode(code: Code) {
    this.currentCode$.next(code);
  }

  public savePayment( payment: Payment) {
    const actualPayments = this.getPayments();
    this.payments$.next([...actualPayments, payment]);
  }

  public getCode(): Code {
    return this.currentCode;
  }

  public getPayments(): Payment[] {
    return this.payments;
  }

}
