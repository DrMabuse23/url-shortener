import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { urlValidator } from './validators/app.validators';
import { UrlShortenerService } from './services/url-shortener.service';
import { IUrlResponse } from './interfaces/api-response.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'url-shortener';
  form: FormGroup;
  subcriber: Subscription[] = [];
  onLoad = false;
  redirectHost = 'http://localhost:3000';
  result: IUrlResponse;

  constructor(private urlService: UrlShortenerService, private sanitizer: DomSanitizer) {}
  ngOnInit() {

    this.form = new FormGroup({
      url: new FormControl('', [
        Validators.required,
        urlValidator
      ]),
      shortId: new FormControl('')
    });

    this.subcriber.push(
      this.shortId.valueChanges.subscribe(value => {
        if (value.length) {
          this.shortId.setValidators([
            Validators.minLength(6),
            Validators.maxLength(6)
          ]);
        } else {
          this.shortId.clearValidators();
          this.shortId.reset();
        }
      })
    );
  }
  submit() {
    if (this.form.valid) {
      this.onLoad = true;
      this.urlService.create(this.form.value)
      .pipe(
        finalize(() => this.onLoad = false)
      )
      .subscribe(
        (res) => {
          this.result = res;
        },
        err => console.error(err)
      );
    }
  }
  get resUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(`${this.redirectHost}/${this.result.shortId}`);
  }
  get shortId() {
    return this.form.get('shortId');
  }

  get controls() {
    return this.form.controls;
  }

  ngOnDestroy() {
    // clean listener
    from(this.subcriber).subscribe(sub => sub.unsubscribe());
  }
}
