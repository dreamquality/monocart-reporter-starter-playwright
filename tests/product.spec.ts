import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/product.page';
import { LoginPage } from '../pages/login.page';

test.describe('Product Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    productPage = new ProductPage(page);
  });

  test('Add product to cart', async () => {
    await productPage.addToCart();
    const badge = await productPage.getCartBadge();
    expect(badge).toBe('1');
  });
});
