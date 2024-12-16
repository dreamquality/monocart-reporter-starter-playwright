import { Page } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private addToCartButton = '.btn_inventory';
  private cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

  async getCartBadge() {
    return await this.page.textContent(this.cartBadge);
  }
}
