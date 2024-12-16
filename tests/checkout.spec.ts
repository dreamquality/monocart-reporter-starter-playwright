import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await inventoryPage.addBackpackToCart(); 
  });


     /**
     * for case
     * @owner Vasya
     * @jira MCR-16777
     */ 
  test('Complete checkout process', async () => {
    await cartPage.goto();
    const cartItems = await cartPage.getCartItems();
    expect(cartItems.length).toBeGreaterThan(0);  

    await checkoutPage.goto();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '90210');
    await checkoutPage.completeCheckout();
  });
});
