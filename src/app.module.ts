import { Module } from '@nestjs/common';
import { MortgageModule } from './mortgage/mortgage.module';

@Module({
  imports: [MortgageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
