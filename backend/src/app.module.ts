import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './core/services/config/config.service';
import { Connection } from 'typeorm';
import { ApiModule } from './api/api.module';
import { UrlShortService } from './api/services/url-short/url-short.service';
import * as cors from 'cors';
import { UrlShortController } from './api/controllers/url-short/url-short.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.postGreSqlConfig),
    CoreModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, UrlShortService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes(UrlShortController, AppController);
  }
}