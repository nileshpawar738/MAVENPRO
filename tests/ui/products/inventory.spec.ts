import { test, expect } from '../../../fixtures/testFixtures';
import loginData from '../../../data/loginData.json';
import { APP } from '../../../constants/appConstants';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  });

  test('user can add a product to the cart @smoke', async ({ inventoryPage, page }) => {
    await inventoryPage.addProductToCart(APP.products.backpack);
    await expect(page.locator(APP.selectors.shoppingCartBadge)).toHaveText('1');
  });

  test('products can be sorted by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(1);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('cart contains the selected product', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addProductToCart(APP.products.backpack);
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect.poll(() => cartPage.getItemNames()).toContain(APP.products.backpack);
  });
});
