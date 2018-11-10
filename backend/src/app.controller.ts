import { Get, Controller, Param, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlShortService } from './api/services/url-short/url-short.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlShortService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('*')
  findOne(@Param() shortId,  @Res() res: Response) {
    return this.urlService.findOne({shortId: shortId[0]})
      .then((entry) => {
        res.redirect(HttpStatus.MOVED_PERMANENTLY, entry.url);
      })
      .catch(err => res.status(HttpStatus.NOT_FOUND));
  }
}
