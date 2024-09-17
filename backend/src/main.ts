import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Middleware
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:3001',
        'http://localhost:3003',
        'http://localhost:3300',
        'http://localhost:4000',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: false,
    }),
  );
  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(
    helmet.frameguard({
      action: 'deny',
    }),
  );

  // Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(4000);
}
bootstrap();
