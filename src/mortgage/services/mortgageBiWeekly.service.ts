import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BIWEEKLY_IN_YEAR, PERCENT } from '../constants/mortgage.constant';
import { MortgageDto } from '../dtos/mortgage.dto';
import { PaymentScheduleType } from '../enum/paymentScheduleType';
import { MortgageCalculate } from '../interface/mortgageCalculate.interface';
import { MortgageAbstract } from './mortgage.abstract';

@Injectable()
export class MortgageBiWeeklyService
  extends MortgageAbstract
  implements MortgageCalculate
{
  runCalculation(mortgage: MortgageDto) {
    if (!super.validateDownPayment(mortgage))
      throw new HttpException(
        `Minimum Payment is not enough!! %5 for lessEqual 500_000, $25000 + (mortgageprice- 500_000) * %10 for between 500_000 and 1_000_000, %20 for more than 1M. In your case: ${super.getMinDownPaymentRequired(
          mortgage.propertyPrice,
        )} is required.`,
        HttpStatus.BAD_REQUEST,
      );

    const payPerPeriod = super.getMortgagePaymentPerPeriod(mortgage);
    const mortgagePayment = {
      type: PaymentScheduleType.BIWEEKLY.toString(),
      mortgage: `$${super.getMortgagePrinciple(mortgage)}`,
      mortgagePayment: `$${payPerPeriod.toFixed(2)}`,
      schedulPayments: super.getSchedulePayment(mortgage, payPerPeriod),
    };
    return mortgagePayment;
  }

  getPaymentNumber(priod: number) {
    return priod * BIWEEKLY_IN_YEAR;
  }
  getRate(annualInterestRate: number) {
    return Math.pow(1 + annualInterestRate / PERCENT, 1 / BIWEEKLY_IN_YEAR) - 1;
  }
}
