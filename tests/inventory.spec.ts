import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';

test.describe('Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('Add Sauce Labs Backpack to cart', async () => {
    await inventoryPage.addBackpackToCart(); 
    await cartPage.goto();  
   
    const cartItems = await cartPage.getCartItems();
    const backpackInCart = cartItems.some(item => item.includes('Sauce Labs Backpack'));
    expect(backpackInCart).toBe(true); 
  });
});
