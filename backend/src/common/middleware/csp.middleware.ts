import { Injectable, NestMiddleware } from '@nestjs/common';
import helmet from 'helmet';

@Injectable()
export class CspMiddleware implements NestMiddleware {
  private csp = helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ['\'self\''],
    },
  });

  use(req: any, res: any, next: () => void) {
    this.csp(req, res, next);
  }
}
