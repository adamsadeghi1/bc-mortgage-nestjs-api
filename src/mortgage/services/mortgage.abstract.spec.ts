import { MortgageDto } from '../dtos/mortgage.dto';
import { MortgageAbstract } from './mortgage.abstract';
import { HttpException } from '@nestjs/common';

class TestMortgageAbstrct extends MortgageAbstract {
   
    getRate(annualInterestRate: number): number {
      return 0.004166666666666667; 
    }
  
    getPaymentNumber(period: number): number {
      return 60; 
    }
  
    
    public testCalculateRemainingBalance(mortgage, numberOfPaymentsPast): number {
      return super.calculateRemainingBalance(mortgage, numberOfPaymentsPast);
    }

    public testGetMinDownPaymentRequired(propertyPrice:number){
       return super.getMinDownPaymentRequired(propertyPrice)
    }

    public testGetMortgagePaymentPerPeriod(mortgage: MortgageDto){
        return super.getMortgagePaymentPerPeriod(mortgage)
    }

    public testGetMortgagePrinciple(mortgage:MortgageDto){
        return super.getMortgagePrinciple(mortgage);
    }

    public testValidateDownPayment(mortgage:MortgageDto){
        return super.validateDownPayment(mortgage);
    }
}


describe('MortgageAbstract', () => {
  let mortgageAbstractMock: TestMortgageAbstrct;

  beforeEach(() => {
    mortgageAbstractMock = new TestMortgageAbstrct();
  });

  it('should calculate mortgage payment per period correctly annual intrest is 5 and for 5 years period Monthly', () => {
    const mortgageDto = {
        propertyPrice:600_000,
        downpayment: 35_000
    };

    const mortgagePayment = mortgageAbstractMock.testGetMortgagePaymentPerPeriod(mortgageDto as MortgageDto);

    expect(mortgagePayment).toBeCloseTo(10_662.24, 1);
  });

  it('should throw and HttpException if property perice is lower than downpayment', () => {
    const mortgageDto = {
        propertyPrice:600_000,
        downpayment: 600_001
    };

    try{
        const mortgagePayment = mortgageAbstractMock.testGetMortgagePrinciple(mortgageDto as MortgageDto);
    }
    catch(error){
        expect(error).toBeInstanceOf(HttpException)
    }
  });

  it('should calculate Remaining Balance with interest 5 and period Monthly 5 yreas', () => {
    const mortgageDto = {
        propertyPrice:600_000,
        downpayment: 60_000
    };
    const paymentTwo=2;
    const remainingBalance = mortgageAbstractMock.testCalculateRemainingBalance(mortgageDto as MortgageDto, paymentTwo);

    expect(remainingBalance).toBeCloseTo(524085.98,2);
  });

  it('should return correct down payment when property price is less than or equal to 500000', () => {
    const propertyPrice = 400000; 
    const expectedDownPayment = propertyPrice * 0.05;

    const downPayment = mortgageAbstractMock.testGetMinDownPaymentRequired(propertyPrice);

    expect(downPayment).toBe(expectedDownPayment);
  });

  it('should return correct down payment when property price is between 500000 and 1000000', () => {
    const propertyPrice = 800000; 
    const expectedDownPayment = 500000 * 0.05 + (propertyPrice - 500000) * 0.1;

    const downPayment = mortgageAbstractMock.testGetMinDownPaymentRequired(propertyPrice);

    expect(downPayment).toBe(expectedDownPayment);
  });

  it('should return correct down payment when property price is greater than 1000000', () => {
    const propertyPrice = 1500000; 
    const expectedDownPayment = propertyPrice * 0.2;

    const downPayment = mortgageAbstractMock.testGetMinDownPaymentRequired(propertyPrice);

    expect(downPayment).toBe(expectedDownPayment);
  });
 
  it('should return true if downpayment is equal to or greater than required minimum', () => {
    const mortgage = {
      propertyPrice: 600000,
      downpayment: 35000,
    };

    const isValid = mortgageAbstractMock.testValidateDownPayment(mortgage as MortgageDto);

    expect(isValid).toBe(true);
  });

  it('should return false if downpayment is less than required minimum', () => {
    const mortgage = {
      propertyPrice: 600000,
      downpayment: 20000
    };

    const isValid = mortgageAbstractMock.testValidateDownPayment(mortgage as MortgageDto);

    expect(isValid).toBe(false);
  });
});
