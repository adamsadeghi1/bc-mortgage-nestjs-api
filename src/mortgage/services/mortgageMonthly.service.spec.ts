import { Test, TestingModule } from '@nestjs/testing';
import { MortgageAbstract } from './mortgage.abstract';
import { MortgageDto } from '../dtos/mortgage.dto';
import { PaymentScheduleType } from '../enum/paymentScheduleType';
import { MortgageMonthlyService } from './mortgageMonthly.service';


describe('MortgageMonthlyService', () => {
  let service: MortgageMonthlyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MortgageMonthlyService, { provide: MortgageAbstract, useClass: MortgageMonthlyService }],
    }).compile();

    service = module.get<MortgageMonthlyService>(MortgageMonthlyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should runCalculation correctly', () => {
    const mortgageDto: MortgageDto = {
      propertyPrice:600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: PaymentScheduleType.MONTHLY
  };

    const result = service.runCalculation(mortgageDto);

    expect(result).toBeDefined();
    expect(result.type).toEqual(PaymentScheduleType.MONTHLY.toString());
    expect(result.mortgage).toEqual("$565000");
    expect(result.schedulPayments[0].paymentNumber).toBe(1);
  });

  it('should getRate correctly',()=>{
    const expectBiWeaklyRateForFivePercent = 0.0041;
    expect(service.getRate(5)).toBeCloseTo(expectBiWeaklyRateForFivePercent);
  })

  it('should get payment number correctly',()=>{
    const expectedPaymentNumberForFiveYears = 60;
    expect(service.getPaymentNumber(5)).toBe(expectedPaymentNumberForFiveYears);
  })

});
