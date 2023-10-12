import { ApiProperty } from '@nestjs/swagger';

export class SchedulePayment {
  @ApiProperty()
  payPerPeriod: string;
  @ApiProperty()
  paymentNumber: number;
  @ApiProperty()
  remainingBalence: string;
  @ApiProperty()
  paidSoFarFromPrinciple: string;
}
