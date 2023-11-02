import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MortgageToken } from '../constants/mortgage.constant';
import { MortgageDto } from '../dtos/mortgage.dto';
import { MortgagePayment } from '../dtos/mortgagePayment.dto';
import { MortgageCalculate } from '../interface/mortgageCalculate.interface';

@ApiTags('BC-Mortgage')
@Controller('api/mortgage')
export class MortgageController {
  constructor(
    @Inject(MortgageToken)
    private readonly mortgageCalculate: MortgageCalculate,
  ) {}
  
  @Get()
  helloWorld(){
    return 'Test End point like Hello world ';
  }

  @Post()
  @UsePipes(new ValidationPipe({
    forbidUnknownValues: true,
    transform: true
}))
  @ApiResponse({
    status: 200,
    description: 'Mortgage Reponse',
    type: MortgagePayment,
    isArray: false,
  })
  calculateMortgage(@Body() mortgageDto: MortgageDto) {
    return this.mortgageCalculate.runCalculation(mortgageDto);
  }
}
