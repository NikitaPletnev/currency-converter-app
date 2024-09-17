import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class ConvertCurrencyInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  sourceCurrency: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  targetCurrency: string;

  @Field()
  @IsNumber()
  @IsPositive()
  amount: number;
}

