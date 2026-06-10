import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent, CheckoutPayload } from './checkout/checkout.component';
import { CheckoutApiService } from './checkout-api.service';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, CheckoutComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private readonly checkoutApi: CheckoutApiService) {}

  onCheckoutComplete(payload: CheckoutPayload): void {
    this.checkoutApi.sendCheckout(payload).subscribe({
      next: (response) => console.log('Checkout complete:', response),
      error: (error) => console.error('Checkout failed:', error),
    });
  }
}
