import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

@Module({
  providers: [ConfigService],
  controllers: [],
})
export class CoreModule {}
