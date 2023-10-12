import { MortgageDto } from '../dtos/mortgage.dto';
import { MortgagePayment } from '../dtos/mortgagePayment.dto';

export interface MortgageCalculate {
  runCalculation(mortgage: MortgageDto): MortgagePayment | Error;
}
