import { MortgageDto } from '../dtos/mortgage.dto';
import { SchedulePayment } from '../dtos/schedulePayment.dto';

export abstract class MortgageAbstract {
  abstract getRate(annualInterestRate: number): number;
  abstract getPaymentNumber(priod: number): number;

  protected getMortgagePaymentPerPeriod(mortgage: MortgageDto) {
    return this.mortgageCalculator(
      mortgage.propertyPrice - mortgage.downpayment,
      this.getRate(mortgage.annualInterestRate),
      this.getPaymentNumber(mortgage.period),
    );
  }

  protected getMortgagePrinciple(mortgage: MortgageDto) {
    return mortgage.propertyPrice - mortgage.downpayment;
  }

  protected mortgageCalculator(
    principal: number,
    interestRate: number,
    paymentNumberBasedOnPeriod: number,
  ) {
    return (
      (principal *
        (interestRate *
          Math.pow(1 + interestRate, paymentNumberBasedOnPeriod))) /
      (Math.pow(1 + interestRate, paymentNumberBasedOnPeriod) - 1)
    );
  }

  protected calculateRemainingBalence(
    mortgage: MortgageDto,
    numberOfPaymentPast: number,
  ) {
    return (
      ((mortgage.propertyPrice - mortgage.downpayment) *
        (Math.pow(
          1 + this.getRate(mortgage.annualInterestRate),
          this.getPaymentNumber(mortgage.period),
        ) -
          Math.pow(
            1 + this.getRate(mortgage.annualInterestRate),
            numberOfPaymentPast,
          ))) /
      (Math.pow(
        1 + this.getRate(mortgage.annualInterestRate),
        this.getPaymentNumber(mortgage.period),
      ) -
        1)
    );
  }

  protected getSchedulePayment(mortgage: MortgageDto, payPerPeriod: number) {
    const schedulePayment: SchedulePayment[] = [];
    for (let i = 0; i < this.getPaymentNumber(mortgage.period); i++) {
      const remainingBalence = this.calculateRemainingBalence(mortgage, i + 1);
      const payment = {
        payPerPeriod: `$${payPerPeriod.toFixed(2)}`,
        paymentNumber: i + 1,
        remainingBalence: `$${remainingBalence.toFixed(2)}`,
        paidSoFarFromPrinciple: `$${(
          mortgage.propertyPrice -
          mortgage.downpayment -
          remainingBalence
        ).toFixed(2)}`,
      };
      schedulePayment.push(payment);
    }

    return schedulePayment;
  }

  protected getMinDownPaymentRequired(propertyPrice: number) {
    if (propertyPrice <= 500_000) return propertyPrice * 0.05;
    else if (propertyPrice > 500_000 && propertyPrice < 1_000_000)
      return 500_000 * 0.05 + (propertyPrice - 500_000) * 0.1;
    else return propertyPrice * 0.2;
  }

  protected validateDownPayment(mortgage:MortgageDto){
    if (mortgage.downpayment < this.getMinDownPaymentRequired(mortgage.propertyPrice))
      return false;
    return true;    
  }
}