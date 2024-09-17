import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ConfigService } from '@nestjs/config';

describe('CurrencyService', () => {
    let service: CurrencyService;
    let httpService: HttpService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CurrencyService,
                HttpService,
                ConfigService,
            ],
        }).compile();
        
        service = module.get<CurrencyService>(CurrencyService);
        httpService = module.get<HttpService>(HttpService);
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
