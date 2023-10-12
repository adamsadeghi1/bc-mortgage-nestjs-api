
import { MortgageFactory } from './mortgage.factory';
import { MortgageWeeklyService } from './services/mortgageWeekly.service';
import { MortgageMonthlyService } from './services/mortgageMonthly.service';
import { MortgageBiWeeklyService } from './services/mortgageBiWeekly.service';
import { Request } from 'express';
import { HttpException } from '@nestjs/common';

describe('MortgageFactory', () => {
  let mortgageFactory: MortgageFactory;
  let mockMonthlyService: MortgageMonthlyService;
  let mockBiWeeklyService: MortgageBiWeeklyService;
  let mockWeeklyService: MortgageWeeklyService;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    mockMonthlyService = {} as MortgageMonthlyService;
    mockBiWeeklyService = {} as MortgageBiWeeklyService;
    mockWeeklyService = {} as MortgageWeeklyService;
    mockRequest = { body: {} };
    mortgageFactory = new MortgageFactory(
      mockRequest as Request,
      mockMonthlyService,
      mockBiWeeklyService,
      mockWeeklyService,
    );
  });

  it('should be defined', () => {
    expect(mortgageFactory).toBeDefined();
  });

  it('should return monthly service for monthly payment schedule', () => {
    mockRequest.body.paymentSchedule = 'monthly';
    const service = mortgageFactory.create();
    expect(service).toBe(mockMonthlyService);
  });

  it('should return biweekly service for biweekly payment schedule', () => {
    mockRequest.body.paymentSchedule = 'biweekly';
    const service = mortgageFactory.create();
    expect(service).toBe(mockBiWeeklyService);
  });

  it('should return weekly service for weekly payment schedule', () => {
    mockRequest.body.paymentSchedule = 'weekly';
    const service = mortgageFactory.create();
    expect(service).toBe(mockWeeklyService);
  });

  it('should throw HttpException for invalid payment schedule', () => {
    mockRequest.body.paymentSchedule = 'invalid';
    expect(() => mortgageFactory.create()).toThrowError(HttpException);
  });

  it('should throw HttpException for undefined payment schedule', () => {
    mockRequest.body.paymentSchedule = undefined;
    expect(() => mortgageFactory.create()).toThrowError(HttpException);
  });
});
