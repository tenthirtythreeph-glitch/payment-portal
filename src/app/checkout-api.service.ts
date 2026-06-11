import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutPayload } from './checkout/checkout.component';

@Injectable({
  providedIn: 'root',
})
export class CheckoutApiService {
  private readonly apiUrl = 'https://payment-portal-api.vercel.app/api/pay';

  constructor(private readonly http: HttpClient) {}

  sendCheckout(payload: CheckoutPayload): Observable<CheckoutPayload> {
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json; charset=UTF-8'
    // });
    return this.http.post<CheckoutPayload>(this.apiUrl, payload);
  }
}
