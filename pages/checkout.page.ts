import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = '#continue';
  private finishButton = '#finish';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async completeCheckout() {
    await this.page.click(this.finishButton);
  }
}
