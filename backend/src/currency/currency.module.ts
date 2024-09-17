import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';
import { InfluxDBService } from '../common/influxdb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CurrencyService, CurrencyResolver, InfluxDBService],
})
export class CurrencyModule {}
