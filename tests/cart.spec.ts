import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await inventoryPage.addBackpackToCart();  // Add to cart
  });

  test('Check items in cart', async () => {
    await cartPage.goto();
    const cartItems = await cartPage.getCartItems();
    expect(cartItems.length).toBeGreaterThan(0); 
  });
});
