import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxDBService implements OnModuleInit, OnModuleDestroy {
  private influxDB: InfluxDB;
  private writeApi: WriteApi;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get<string>('INFLUXDB_URL');
    const token = this.configService.get<string>('INFLUXDB_TOKEN');
    const org = this.configService.get<string>('INFLUXDB_ORG');
    const bucket = this.configService.get<string>('INFLUXDB_BUCKET');

    if (!url || !token || !org || !bucket) {
      throw new Error('InfluxDB configuration is missing or incomplete.');
    }

    this.influxDB = new InfluxDB({
      url,
      token,
    });
    this.writeApi = this.influxDB.getWriteApi(org, bucket);

    console.log('InfluxDBService initialized with URL:', url);
  }

  logConversion(
    sourceCurrency: string,
    targetCurrency: string,
    amount: number,
  ) {
    const point = new Point('currency_conversion')
      .tag('source_currency', sourceCurrency)
      .tag('target_currency', targetCurrency)
      .floatField('amount', amount)
      .timestamp(new Date());

    this.writeApi.writePoint(point);
    this.writeApi
      .flush()
      .then(() => {
        console.log('Data successfully written to InfluxDB');
      })
      .catch((err) => {
        console.error(`Error writing to InfluxDB: ${err}`);
      });
  }

  onModuleDestroy() {
    this.writeApi
      .close()
      .then(() => {
        console.log('InfluxDB writeApi closed successfully.');
      })
      .catch((err) => {
        console.error(`Error closing InfluxDB writeApi: ${err}`);
      });
  }
}
