import { Component } from '@angular/core';
import { CheckoutComponent, CheckoutPayload } from './checkout/checkout.component';

@Component({
  selector: 'app-root',
  imports: [CheckoutComponent],
  templateUrl: './app.html',
})
export class App {
  onCheckoutComplete(payload: CheckoutPayload): void {
    console.log('Checkout complete:', payload);
  }
}
