import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CurrencyConversionResponse {
  @IsString()
  base_currency: string;

  @IsString()
  quote_currency: string;

  @IsNumber()
  quote: number;

  @IsDateString()
  date: string;
}
