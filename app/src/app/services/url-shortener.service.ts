import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUrlResponse } from '../interfaces/api-response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  constructor(private http: HttpClient) { }

  private get apiUrl() {
    return 'http://localhost:3000/api/v1/url-short';
  }

  public create(values: {path: string, shortId?: string}): Observable<IUrlResponse> {
    return this.http.post(this.apiUrl, values)
      .pipe(
        map((resp: IUrlResponse) => resp)
      );
  }
}
