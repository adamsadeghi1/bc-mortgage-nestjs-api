import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PaymentScheduleType } from '../enum/paymentScheduleType';

export class MortgageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  propertyPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  downpayment: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  annualInterestRate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(5)
  @Max(30)
  period: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    `^${Object.values(PaymentScheduleType)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
    {
      message:
        'paymentSchedule shoud be one of these options case-insensitive : weekly| biweekly | monthly ',
    },
  )
  paymentSchedule: PaymentScheduleType;

  // constructor( downpayment, annualInterestRate,period, propertyPrice, paymentSchedule){
  //     this.downpayment = downpayment;
  //     this.annualInterestRate =annualInterestRate;
  //     this.period = period;
  //     this.propertyPrice = propertyPrice;
  //     this.paymentSchedule = paymentSchedule;
  // }
}
