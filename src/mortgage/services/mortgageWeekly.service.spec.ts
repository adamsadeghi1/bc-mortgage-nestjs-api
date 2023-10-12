import { Test, TestingModule } from '@nestjs/testing';
import { MortgageWeeklyService } from './mortgageWeekly.service';
import { MortgageAbstract } from './mortgage.abstract';
import { MortgageDto } from '../dtos/mortgage.dto';
import { PaymentScheduleType } from '../enum/paymentScheduleType';
import { MortgageAbstractMock } from './MortgageAbstractMock.abstact.mock';



describe('MortgageWeeklyService', () => {
  let service: MortgageWeeklyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MortgageWeeklyService, { provide: MortgageAbstract, useClass: MortgageAbstractMock }],
    }).compile();

    service = module.get<MortgageWeeklyService>(MortgageWeeklyService);
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
      paymentSchedule: PaymentScheduleType.WEEKLY
  };

    const result = service.runCalculation(mortgageDto);

    expect(result).toBeDefined();
    expect(result.type).toEqual(PaymentScheduleType.WEEKLY.toString());
    expect(result.mortgage).toEqual("$565000");
    expect(result.schedulPayments[0].paymentNumber).toBe(1);
  });

  it('should getRate correctly',()=>{
    const expectWeaklyRateForFivePercent = 0.0009;
    expect(service.getRate(5)).toBeCloseTo(expectWeaklyRateForFivePercent);
  })

  it('should get payment number correctly',()=>{
    const expectedPaymentNumberForFiveYears = 260;
    expect(service.getPaymentNumber(5)).toBe(expectedPaymentNumberForFiveYears);
  })

});
