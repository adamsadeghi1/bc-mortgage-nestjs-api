import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MortgageToken } from '../constants/mortgage.constant';
import { MortgageDto } from '../dtos/mortgage.dto';
import { MortgagePayment } from '../dtos/mortgagePayment.dto';
import { MortgageCalculate } from '../interface/mortgageCalculate.interface';

@ApiTags('BC-Morgage')
@Controller('api/morgage')
export class MorgageController {
  constructor(
    @Inject(MortgageToken)
    private readonly mortgageCalculate: MortgageCalculate,
  ) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Mortgage Reponse',
    type: MortgagePayment,
    isArray: false,
  })
  calculateMorgage(@Body() mortgageDto: MortgageDto) {
    return this.mortgageCalculate.runCalculation(mortgageDto);
  }
}
