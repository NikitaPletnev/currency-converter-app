import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfluxDBService } from './common/influxdb.service';
import { CurrencyModule } from './currency/currency.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    }),
    CurrencyModule,
  ],
  providers: [InfluxDBService],
  exports: [InfluxDBService],
})
export class AppModule {}
