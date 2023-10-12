import { MortgageAbstract } from "./mortgage.abstract";

export class MortgageAbstractMock extends MortgageAbstract {
  getRate(annualInterestRate: number): number {
    return 0.05;
  }

  getPaymentNumber(priod: number): number {
    return 12; 
  }
}
