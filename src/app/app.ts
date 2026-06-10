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
      next: (response: any) => {
        console.log('Checkout complete:', response.redirect_url);
        window.location.href = response.redirect_url
        // Optionally, you can show a success message or redirect the user here
      },
      error: (error: any) => {
        console.error('Checkout failed:', error);
        const message = error?.error?.operation?.error_message || error?.message ||  'An unexpected error occurred during checkout.';
        this.errorModal.show(message);
      },
    });
  }
}
