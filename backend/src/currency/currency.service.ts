import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InfluxDBService } from "../common/influxdb.service";
import { ConvertCurrencyInput } from './dto/convert-currency.input';
import { firstValueFrom } from 'rxjs';
import NodeCache from 'node-cache';
import { ConfigService } from '@nestjs/config';
import { CurrencyConversionResponse } from "./dto/convert-currency.serviceresponce";

@Injectable()
export class CurrencyService {
  private cache = new NodeCache({
    stdTTL: 3600,
  }); // Cache TTL set to 1 hour

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly influxDBService: InfluxDBService,
  ) {}

  async convertCurrency(input: ConvertCurrencyInput): Promise<string> {
    const { sourceCurrency, targetCurrency, amount } = input;

    if(sourceCurrency.length !== 3 || targetCurrency.length !== 3 || amount <= 0){
        throw new BadRequestException('Invalid Input Data');
    }
    const supportedCurrencies = await this.getSupportedCurrencies();
    if (
      !supportedCurrencies.find((opt: any) => opt.base_currency.toUpperCase()) ||
      !supportedCurrencies.find((opt: any) => opt.quote_currency.toUpperCase())
    ) {
      throw new BadRequestException('Unsupported currency code.');
    }

    // Get exchange rate
    const exchangeRate = this.getExchangeRate(
      sourceCurrency.toUpperCase(),
      targetCurrency.toUpperCase(),
      supportedCurrencies,
    );

    const convertedAmount = exchangeRate * amount;

    // Format the result using Intl.NumberFormat
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency.toUpperCase(),
    }).format(convertedAmount);

    // Log the conversion to InfluxDB
    this.influxDBService.logConversion(sourceCurrency, targetCurrency, amount);

    return formattedAmount;
  }

  private async getSupportedCurrencies(): Promise<
    CurrencyConversionResponse[]
    > {
    const cacheKey = "supportedCurrencies";
    if (this.cache.has(cacheKey)) {
      return this.cache.get<CurrencyConversionResponse[]>(cacheKey);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('https://swop.cx/rest/rates', {
          params: {
            "api-key": this.configService.get("SWOP_API_KEY"),
          },
        }),
      );
      const currencies = response.data;

      this.cache.set(cacheKey, currencies);
      return currencies;
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to fetch supported currencies.",
      );
    }
  }

  private getExchangeRate(
    source: string,
    target: string,
    rates: CurrencyConversionResponse[],
  ): number {
    const toBase = rates.find((opt) => opt.quote_currency === source)?.quote;
    const toTarget = rates.find((opt) => opt.quote_currency === target)?.quote;
    if (!toBase || !toTarget) {
      throw new InternalServerErrorException("Unable to convert.");
    }
    return toTarget / toBase;
  }
}
