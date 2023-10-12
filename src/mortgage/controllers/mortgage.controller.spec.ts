import { Test, TestingModule } from '@nestjs/testing';
import { MortgageController } from './mortgage.controller';
import { MortgageToken } from '../constants/mortgage.constant';
import { Scope } from '@nestjs/common';
import { MortgageFactory } from '../mortgage.factory';
import { MortgageMonthlyService } from '../services/mortgageMonthly.service';
import { MortgageBiWeeklyService } from '../services/mortgageBiWeekly.service';
import { MortgageWeeklyService } from '../services/mortgageWeekly.service';

describe('MortgageController', () => {
  let controller: MortgageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortgageController],
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

    controller = module.get<MortgageController>(MortgageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
