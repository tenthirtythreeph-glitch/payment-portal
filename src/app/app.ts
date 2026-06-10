import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent, CheckoutPayload } from './checkout/checkout.component';
import { CheckoutApiService } from './checkout-api.service';
import { ErrorModal } from './error-modal/error-modal';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, CheckoutComponent, ErrorModal],
  templateUrl: './app.html',
})
export class App {
  @ViewChild(ErrorModal) errorModal!: ErrorModal;
  
  constructor(private readonly checkoutApi: CheckoutApiService) {}

  onCheckoutComplete(payload: CheckoutPayload): void {
    this.checkoutApi.sendCheckout(payload).subscribe({
      next: (response) => console.log('Checkout complete:', response),
      error: (error) => {
        console.error('Checkout failed:', error);
        const message = error?.message || 'Payment failed. Please try again.';
        this.errorModal.show(message);
      },
    });
  }
}
