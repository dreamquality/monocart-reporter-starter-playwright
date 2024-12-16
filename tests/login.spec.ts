import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  
  test('Valid login',{
    tag: '@slow',
  }, async () => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const titles = await inventoryPage.getProductTitles();
    expect(0).toBeGreaterThan(0); 
  });

  test('Invalid login', async () => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_pass');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match');
  });
});
