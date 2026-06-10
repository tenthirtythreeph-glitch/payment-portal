import { Component, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

export interface CheckoutPayload {
  // subTotal: number;
  // processingFee: number;
  // totalAmount: number;
  // paymentMethod: string;
  "service_id": string,
  "passwork": string,
  "amount": number,
  "currency": string,
  "operation_id": string,
  "payment_id": string,
  "by_method": string,
  "callback_url": string,
  "return_url": string,
  "signature": string,
  'redirect_url'?: string,
}

export interface PaymentMethodOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  readonly processingFee = 25;
  readonly presetAmounts = [100, 500, 1000, 2500, 5000, 10000];

  readonly paymentMethods: PaymentMethodOption[] = [
    {
      id: 'card',
      label: 'card',
      description: 'Visa, Mastercard, and local debit cards',
      enabled: true,
    },
    {
      id: 'bank-transfer',
      label: 'Bank Transfer',
      description: 'Direct deposit to merchant account',
      enabled: false,
    },
    {
      id: 'online-banking',
      label: 'Online Banking',
      description: 'Pay through your bank portal',
      enabled: false,
    },
    {
      id: 'over-counter',
      label: 'Over-the-Counter',
      description: '7-Eleven, Cebuana, and partners',
      enabled: false,
    },
    {
      id: 'digital-wallet',
      label: 'Digital Cash/Wallet',
      description: 'GCash, Maya, and e-wallets',
      enabled: false,
    },
    {
      id: 'qrph',
      label: 'QRPH',
      description: 'Scan & pay with any bank app',
      enabled: false,
    },
  ];

  readonly enabledPaymentMethods = this.paymentMethods.filter((m) => m.enabled);
  readonly disabledPaymentMethods = this.paymentMethods.filter((m) => !m.enabled);

  readonly checkoutComplete = output<CheckoutPayload>();

  readonly currentStep = signal(1);
  readonly subTotal = signal(0);
  readonly paymentMethod = signal('card');

  readonly totalAmount = computed(() => this.subTotal() + this.processingFee);
  readonly canContinueStep1 = computed(() => this.subTotal() > 0);
  readonly selectedPaymentMethod = computed(() =>
    this.paymentMethods.find((m) => m.label === this.paymentMethod()),
  );

  onAmountInput(value: string): void {
    const parsed = parseInt(value, 10);
    this.subTotal.set(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
  }

  selectPreset(amount: number): void {
    this.subTotal.set(amount);
  }

  selectPaymentMethod(method: PaymentMethodOption): void {
    if (!method.enabled) {
      return;
    }
    this.paymentMethod.set(method.label);
  }

  isPaymentMethodSelected(method: PaymentMethodOption): boolean {
    return method.enabled && this.paymentMethod() === method.label;
  }

  goToStep2(): void {
    if (this.canContinueStep1()) {
      this.currentStep.set(2);
    }
  }

  goToStep1(): void {
    this.currentStep.set(1);
  }

  submitCheckout(): void {
    var date = new Date();
    var timestamp = date.getTime();

    let operationId = `ten33${timestamp}`;
    let paymentId = `ten33${timestamp}`;

    let serviceId = 'ten33';
    let passwork = '6[1v2hKy5lZ>';
    let secretKey = '=N?WQ=biB|%j!jl[>t}yT[L!*kY{jo';
    let currency = 'USD';
    let callbackUrl = 'http://localhost:3000/api/notify';
    let returnUrl = 'http://localhost:4200/';

    let raw_signature = serviceId + passwork + this.totalAmount() + currency + operationId + paymentId + this.paymentMethod() + callbackUrl + returnUrl;
    let signature = CryptoJS.HmacSHA256(raw_signature, secretKey); // This is a placeholder. Replace with actual signature generation logic.

    const payload: CheckoutPayload = {
      service_id: serviceId,
      passwork: passwork,
      amount: this.totalAmount(),
      currency: currency,
      operation_id: `${serviceId}${timestamp}`,
      payment_id: `${serviceId}${timestamp}`,
      by_method: this.paymentMethod(),
      callback_url: callbackUrl,
      return_url: returnUrl,
      signature: signature.toString(),
    }
    this.checkoutComplete.emit(payload);

    // this.checkoutComplete.emit({
    //   subTotal: this.subTotal(),
    //   processingFee: this.processingFee,
    //   totalAmount: this.totalAmount(),
    //   paymentMethod: this.paymentMethod(),
    // });
  }
}
