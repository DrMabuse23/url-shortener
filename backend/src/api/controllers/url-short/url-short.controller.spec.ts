import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortController } from './url-short.controller';

describe('UrlShort Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UrlShortController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UrlShortController = module.get<UrlShortController>(UrlShortController);
    expect(controller).toBeDefined();
  });
});
