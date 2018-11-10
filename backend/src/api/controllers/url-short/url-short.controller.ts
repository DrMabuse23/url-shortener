import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUrlShortDto } from 'src/api/dto/url-short.dto';
import { UrlShortService } from 'src/api/services/url-short/url-short.service';

@Controller('api/v1/url-short')
export class UrlShortController {
  constructor(private readonly urlShortService: UrlShortService) {}

  @Post()
  create(@Body(ValidationPipe) entry: CreateUrlShortDto, @Res() res) {
    return this.urlShortService
      .create(entry)
      .then(_user => res.status(HttpStatus.CREATED).json(_user))
      .catch(e => res.status(HttpStatus.EXPECTATION_FAILED).json(e));
  }
}
