import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MortgageDto } from '../src/mortgage/dtos/mortgage.dto';
import { PaymentScheduleType } from '../src/mortgage/enum/paymentScheduleType';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should expext weekly mortgage response api/morgage (POST)', async () => {
    const mortgageDto: MortgageDto = {
      propertyPrice:600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: PaymentScheduleType.WEEKLY
  };

    const res = await request(app.getHttpServer())
      .post('/api/morgage')
      .send(mortgageDto)
      .expect(201);
    
    expect(res.body.type).toBe("WEEKLY");

  });

  it('Should expext monthly mortgage response api/morgage (POST)', async () => {
    const mortgageDto: MortgageDto = {
      propertyPrice:600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: PaymentScheduleType.MONTHLY
  };

    const res = await request(app.getHttpServer())
      .post('/api/morgage')
      .send(mortgageDto)
      .expect(201);
    
    expect(res.body.type).toBe("MONTHLY");

  });

  it('Should expext biweekly mortgage response api/morgage (POST)', async () => {
    const mortgageDto: MortgageDto = {
      propertyPrice:600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: PaymentScheduleType.BIWEEKLY
  };

    const res = await request(app.getHttpServer())
      .post('/api/morgage')
      .send(mortgageDto)
      .expect(201);
    
    expect(res.body.type).toBe("BIWEEKLY");
  });
  
  it('Should fail when Payment Schedule is not provide api/morgage (POST)', async () => {
    const mortgageDto = {
      propertyPrice:600000,
      downpayment: 35000,
      annualInterestRate: 5.4,
      period: 25,
      paymentSchedule: ""
  };

    const res = await request(app.getHttpServer())
      .post('/api/morgage')
      .send(mortgageDto)
      .expect(400);
  });



});
