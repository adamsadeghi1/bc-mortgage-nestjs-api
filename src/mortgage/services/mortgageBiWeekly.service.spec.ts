import { Test, TestingModule } from '@nestjs/testing';
import { MortgageAbstract } from './mortgage.abstract';
import { MortgageDto } from '../dtos/mortgage.dto';
import { PaymentScheduleType } from '../enum/paymentScheduleType';
import { MortgageBiWeeklyService } from './mortgageBiWeekly.service';

describe('MortgageBiWeeklyService', () => {
  let service: MortgageBiWeeklyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MortgageBiWeeklyService,
        { provide: MortgageAbstract, useClass: MortgageBiWeeklyService },
      ],
    }).compile();

    service = module.get<MortgageBiWeeklyService>(MortgageBiWeeklyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should runCalculation correctly', () => {
    const mortgageDto: MortgageDto = {
      propertyPrice: 600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: PaymentScheduleType.BIWEEKLY,
    };

    const result = service.runCalculation(mortgageDto);

    expect(result).toBeDefined();
    expect(result.type).toEqual(PaymentScheduleType.BIWEEKLY.toString());
    expect(result.mortgage).toEqual('$565000');
    expect(result.schedulPayments[0].paymentNumber).toBe(1);
  });

  it('should getRate correctly', () => {
    const expectBiWeaklyRateForFivePercent = 0.0018;
    expect(service.getRate(5)).toBeCloseTo(expectBiWeaklyRateForFivePercent);
  });

  it('should get payment number correctly', () => {
    const expectedPaymentNumberForFiveYears = 130;
    expect(service.getPaymentNumber(5)).toBe(expectedPaymentNumberForFiveYears);
  });
});
