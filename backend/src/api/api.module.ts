import { Module } from '@nestjs/common';
import { UrlShortController } from './controllers/url-short/url-short.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { UrlShortService } from './services/url-short/url-short.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlShortController],
  providers: [UrlShortService],
})
export class ApiModule {
  
}
