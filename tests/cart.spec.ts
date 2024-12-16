import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

/**
 * for describe suite
 * @owner Mark
 * @jira MCR-16900
 */
test.describe(
  "Cart Tests",
  {
    tag: "@fast",
  },
  () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    /**
     * rewrite "beforeEach hook" title to
     * @title do something before each
     */
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login("standard_user", "secret_sauce");
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      await inventoryPage.addBackpackToCart(); // Add to cart
    });

    /**
     * for case
     * @owner Kevin
     * @jira MCR-16888
     */
    test("Check items in cart", async () => {
      await cartPage.goto();
      const cartItems = await cartPage.getCartItems();
      expect(cartItems.length).toBeGreaterThan(0);
    });
  }
);
