import { Test, TestingModule } from '@nestjs/testing';
import { MorgageController } from './mortgage.controller';
import { MortgageToken } from '../constants/mortgage.constant';
import { Scope } from '@nestjs/common';
import { MortgageFactory } from '../mortgage.factory';
import { MortgageMonthlyService } from '../services/mortgageMonthly.service';
import { MortgageBiWeeklyService } from '../services/mortgageBiWeekly.service';
import { MortgageWeeklyService } from '../services/mortgageWeekly.service';

describe('MorgageController', () => {
  let controller: MorgageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MorgageController],
      providers: [
        {
          provide: MortgageToken,
          scope: Scope.REQUEST,
          useFactory: (dataSourceFactory: MortgageFactory) => {
            return dataSourceFactory.create();
          },
          inject: [MortgageFactory],
        },
        MortgageFactory,
        MortgageMonthlyService,
        MortgageBiWeeklyService,
        MortgageWeeklyService,
      ],
    }).compile();

    controller = module.get<MorgageController>(MorgageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
