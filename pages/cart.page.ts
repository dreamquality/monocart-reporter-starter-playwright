import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private cartItemsSelector = '.cart_item';

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItems() {
    return await this.page.$$eval(this.cartItemsSelector, items => items.map(item => item.textContent?.trim()));
  }

  async goto() {
    await this.page.goto('/cart.html');
  }
}
