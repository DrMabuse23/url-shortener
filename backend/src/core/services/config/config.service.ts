import { Injectable } from '@nestjs/common';
import { UrlEntity } from 'src/api/entities/url.entity';

@Injectable()
export class ConfigService {
  static get postGreSqlConfig(): any {
    // console.log(`${__dirname}/../../**/*.entity{.ts,.js}`);
    return {
      type: 'postgres',
      host: 'localhost',
      port: process.env.PGPORT,
      username: process.env.POSTGRES_USER || 'root',
      password: process.env.POSTGRES_PASSWORD || 'root_password',
      database: process.env.POSTGRES_DB || 'url_short_dev',
      entities: [UrlEntity],
      synchronize: true,
    };
  }

  get dbName() {
    return ConfigService.postGreSqlConfig.database;
  }
}