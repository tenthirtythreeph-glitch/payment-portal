import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutPayload } from './checkout/checkout.component';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  private readonly apiUrl = 'https://uat-api.fastpayph.com/pay';

  constructor(private readonly http: HttpClient) {}

  sendCheckout(payload: CheckoutPayload): Observable<CheckoutPayload> {
    return this.http.post<CheckoutPayload>(this.apiUrl, payload);
  }
}
