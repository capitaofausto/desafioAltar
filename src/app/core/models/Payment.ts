import { Code } from './Code'

/* tslint:disable */
export interface PaymentInterface {
  id? : number
  name: string
  amount: number
  code: Code

}

export class Payment implements PaymentInterface {
  id? : number
  name: string
  amount: number
  code: Code
  constructor(data?: PaymentInterface) {
    Object.assign(this, data)
  }
}
