import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MortgageMonthlyService } from './services/mortgageMonthly.service';
import { MortgageBiWeeklyService } from './services/mortgageBiWeekly.service';
import { MortgageWeeklyService } from './services/mortgageWeekly.service';

@Injectable({ scope: Scope.REQUEST })
export class MortgageFactory {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly mortgageMonthlyCalculate: MortgageMonthlyService,
    private readonly mortgageBiWeeklyCalculate: MortgageBiWeeklyService,
    private readonly mortgageWeeklyCalculate: MortgageWeeklyService,
  ) {}

  create() {
    if (!this.request.body.paymentSchedule )
      throw new HttpException(
        `Invalid payment schedule paymentSchedule shoud be one of these options case-insensitive : weekly| biweekly | monthly `,
        HttpStatus.BAD_REQUEST
      );
    const sourceType = this.request.body;

    switch (sourceType.paymentSchedule.toUpperCase()) {
      case 'MONTHLY':
        return this.mortgageMonthlyCalculate;
      case 'BIWEEKLY':
        return this.mortgageBiWeeklyCalculate;
      case 'WEEKLY':
        return this.mortgageWeeklyCalculate;
      default:
        throw new HttpException(
          `Invalid payment schedule: ${sourceType.paymentSchedule}. paymentSchedule shoud be one of these options case-insensitive : weekly| biweekly | monthly `,
          HttpStatus.BAD_REQUEST
        );
    }
  }

}

