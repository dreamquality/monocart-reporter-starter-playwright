import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private productTitles = '.inventory_item_name';
  private productPrice = '.inventory_item_price';
  private addToCartButton = '.btn_inventory';
  private backpackTitle = 'Sauce Labs Backpack';  // Название товара

  constructor(page: Page) {
    this.page = page;
  }

  async getProductTitles() {
    return await this.page.$$eval(this.productTitles, titles => titles.map(title => title.textContent?.trim()));
  }

  async getProductPrices() {
    return await this.page.$$eval(this.productPrice, prices => prices.map(price => price.textContent?.trim()));
  }

  async addBackpackToCart() {
    const backpackIndex = await this.page.$$eval(this.productTitles, (titles, backpackTitle) =>
      titles.findIndex(title => title.textContent?.trim() === backpackTitle), this.backpackTitle);

    if (backpackIndex !== -1) {
      const addToCartButtons = await this.page.$$(this.addToCartButton);
      await addToCartButtons[backpackIndex].click(); 
    } else {
      throw new Error('Sauce Labs Backpack not found on the page');
    }
  }
}
