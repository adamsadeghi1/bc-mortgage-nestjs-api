import { ApiProperty } from '@nestjs/swagger';
import { SchedulePayment } from './schedulePayment.dto';

export class MortgagePayment {
  @ApiProperty()
  type: string;
  @ApiProperty()
  mortgage: string;
  @ApiProperty()
  mortgagePayment: string;
  @ApiProperty()
  schedulPayments: SchedulePayment[];
}
