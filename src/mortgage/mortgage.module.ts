import { Module, Scope } from '@nestjs/common';
import { MortgageController } from './controllers/mortgage.controller';
import { MortgageFactory } from './mortgage.factory';
import { MortgageMonthlyService } from './services/mortgageMonthly.service';
import { MortgageToken } from './constants/mortgage.constant';
import { MortgageBiWeeklyService } from './services/mortgageBiWeekly.service';
import { MortgageWeeklyService } from './services/mortgageWeekly.service';

@Module({
  imports: [],
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
})
export class MortgageModule {}
