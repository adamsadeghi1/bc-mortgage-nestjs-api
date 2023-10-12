import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MortgageDto } from '../dtos/mortgage.dto';
import { MortgageCalculate } from '../interface/mortgageCalculate.interface';
import { MortgageToken } from '../constants/mortgage.constant';
import { MortgagePayment } from '../dtos/mortgagePayment.dto';

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
    type: MortgagePayment ,
    isArray: false,
    
})
  calculateMorgage(@Body() mortgageDto: MortgageDto) {
    return this.mortgageCalculate.runCalculation(mortgageDto);
  }
}
