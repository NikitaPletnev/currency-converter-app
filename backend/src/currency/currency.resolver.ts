import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { ConvertCurrencyInput } from './dto/convert-currency.input';

@Resolver('Currency')
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => String)
  async convertCurrency(
    @Args('input') input: ConvertCurrencyInput,
  ): Promise<string> {
    return this.currencyService.convertCurrency(input);
  }
}
