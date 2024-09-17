import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Currency Conversion (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(30000); // Increase timeout for API calls
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });

  it('should convert currency successfully', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query ConvertCurrency($input: ConvertCurrencyInput!) {
          convertCurrency(input: $input)
        }`,
        variables: {
          input: {
            sourceCurrency: 'USD',
            targetCurrency: 'EUR',
            amount: 100,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.convertCurrency).toMatch(/€\d+.\d+/);
      });
  });

  it('should return error for invalid currency code', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query ConvertCurrency($input: ConvertCurrencyInput!) {
          convertCurrency(input: $input)
        }`,
        variables: {
          input: {
            sourceCurrency: 'INVALID',
            targetCurrency: 'EUR',
            amount: 100,
          },
        },
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
