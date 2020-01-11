/* tslint:disable */
export interface CodeInterface {
  id? : number
  value: string
  grid: String[][]
}

export class Code implements CodeInterface {
  id? : number
  value: string
  grid: String[][]
  constructor(data?: CodeInterface) {
    Object.assign(this, data)
  }
}
