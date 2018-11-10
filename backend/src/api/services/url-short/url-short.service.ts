import { Injectable } from '@nestjs/common';
import { CreateUrlShortDto } from 'src/api/dto/url-short.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/api/entities/url.entity';
import { Repository } from 'typeorm';
import * as nanoid from 'nanoid';

@Injectable()
export class UrlShortService {
  constructor(
    @InjectRepository(UrlEntity) private readonly dbRepository: Repository<UrlEntity>,
  ) {}
  /**
   * @param {CreateUrlShortDto} _entry
   * @returns
   * @memberof UrlShortService
   */
  async create(_entry: CreateUrlShortDto) {
    if (!_entry.shortId) {
      _entry.shortId = nanoid(6);
      _entry.selfGenerated = false;
    } else {
      _entry.selfGenerated = true;
    }
    // check if the url allready exist and no sef generated id there then return only the entry and dont create one
    return Promise.all([this.dbRepository.findOne({url: _entry.url}), this.dbRepository.findOne({shortId: _entry.shortId})])
      .then((res) => {
        const findByUrl = res[0];
        if (findByUrl && !_entry.selfGenerated) {
          return findByUrl[0];
        }
        return this.saveEntry(_entry);
      });
  }
  /**
   * @param {{[key: string]: any}} query
   * @returns
   * @memberof UrlShortService
   */
  public findOne(query: {[key: string]: any}) {
    return this.dbRepository.findOne(query);
  }
  /**
   * @private
   * @param {CreateUrlShortDto} _entry
   * @returns
   * @memberof UrlShortService
   */
  private saveEntry(_entry: CreateUrlShortDto)  {
    return this.dbRepository.save(_entry)
    .catch(err => {
      const _err = {
        code: 'CREATION FAILED',
        originalError: err,
      };
      return Promise.reject(_err);
    });
  }
  
}
