import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MONTH_IN_YEAR, PERCENT } from '../constants/mortgage.constant';
import { MortgageDto } from '../dtos/mortgage.dto';
import { PaymentScheduleType } from '../enum/paymentScheduleType';
import { MortgageCalculate } from '../interface/mortgageCalculate.interface';
import { MortgageAbstract } from './mortgage.abstract';

@Injectable()
export class MortgageMonthlyService
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
      type: PaymentScheduleType.MONTHLY.toString(),
      mortgage: `$${super.getMortgagePrinciple(mortgage)}`,
      mortgagePayment: `$${payPerPeriod.toFixed(2)}`,
      schedulPayments: this.getSchedulePayment(mortgage, payPerPeriod),
    };

    return mortgagePayment;
  }

  getRate(annualInterestRate: number) {
    return annualInterestRate / MONTH_IN_YEAR / PERCENT;
  }

  getPaymentNumber(priod: number) {
    return priod * MONTH_IN_YEAR;
  }
}
